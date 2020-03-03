import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, TouchableOpacity } from "react-native";
import InputToolbar from "../../../shared/components/InputToolbar";
import TenditMessage from "../../../shared/components/Chat/TenditMessage";
import { useMutation, useQuery } from "react-apollo";
import { parsePostMessages } from "../../../shared/functions/ParsePostMessages";
import { gql } from "apollo-boost";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { sendNotification } from "../../../shared/functions/PushNotifications";
import HeaderStyles from "../../../shared/constants/HeaderStyles";
import { Ionicons } from "@expo/vector-icons";
import { isSmallDevice } from "../../../shared/constants/Layout";
import io from "socket.io-client";
import { socketEndPoint } from "../../../shared/constants/urls";
import moment from "moment/min/moment-with-locales";
import SocketContext from "../../../shared/SocketContext";

const UNSEEAPPLICATIONCHAT_MUTATION = gql`
  mutation unseeApplicationChatChatMutation(
    $id: ID!
    $pubRead: Boolean
    $subRead: Boolean
  ) {
    UnseeApplication(id: $id, pubRead: $pubRead, subRead: $subRead) {
      id
      subRead
      pubRead
    }
  }
`;
const CREATEPOSTMESSAGE_MUTATION = gql`
  mutation createPostMessage($applicationId: ID!, $text: String!, $subId: ID!) {
    createPostMessage(
      applicationId: $applicationId
      text: $text
      subId: $subId
    ) {
      id
      sub {
        pushToken
      }
      text
    }
  }
`;

const MESSAGES_QUERY = gql`
  query chatQuery($id: ID!) {
    PostMessagesFeed(id: $id) {
      sub {
        pushToken
        id
        pictureUrl
      }
      pub {
        pushToken
        id
        pictureUrl
      }
      id
      text
      createdAt
    }
  }
`;

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export function ApplicationReceivedChat(props) {
  const [messages, setMessages] = useState([]);
  const id = props.route.params?.id;
  const application = props.route.params?.application;
  const { loading, error, data, refetch } = useQuery(MESSAGES_QUERY, {
    variables: { id: application.id },
    onCompleted: async ({ PostMessagesFeed }) => {
      console.log(PostMessagesFeed);
    }
  });
  const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION, {
    onCompleted: async ({ unseeChat }) => {
      console.log(unseeChat);
    }
  });

  const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION, {
    onCompleted: async ({ createPostMessage }) => {
      sendNotification(
        createPostMessage.sub.pushToken,
        application.position,
        createPostMessage.text
      );
      unseeChat({ variables: { id: application.id, subRead: false } });
      this.sockettino.emit("chat message", application.id);
      props.socket.emit("postnotifica", application.from.id);
    },
    onError: error => {
      alert("Qualcosa è andato storto");
    }
  });

  useEffect(() => {
    this.sockettino = io(socketEndPoint, { query: { token: application.id } });
    const didBlurSubscription = props.navigation.addListener(
      "didBlur",
      payload => {
        console.debug("didBlur", payload);
        this.sockettino.emit("pocho", "");
        didBlurSubscription.remove();
      }
    );
    moment.locale("it");
  }, []);

  useEffect(() => {
    this.sockettino.on(
      "chat message",
      msg => {
        wait(500)
          .then(() => refetch())
          .then(() => {
            unseeChat({ variables: { id: application.id, pubRead: true } });
          });
      },
      []
    );
  });

  useEffect(() => {
    data && setMessages(parsePostMessages(data.PostMessagesFeed, id));
  }, [data]);

  const onSend = message => {
    createMessage({
      variables: {
        text: message,
        applicationId: application.id,
        subId: application.from.id
      }
    });
  };

  const renderMessage = props => {
    return <TenditMessage {...props} />;
  };

  const renderInputToolbar = props => {
    const image = !loading && { uri: application.to.pictureUrl };
    return <InputToolbar image={image} onSend={onSend}></InputToolbar>;
  };
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        inverted={false}
        messages={messages}
        onSend={message => onSend(message)}
        renderMessage={renderMessage}
        locale={"it"}
        renderInputToolbar={renderInputToolbar}
        user={{
          _id: 1
        }}
        listViewProps={{
          style: {
            backgroundColor: "#F4F4F4"
          }
        }}
      />
      <KeyboardSpacer topSpacing={isSmallDevice ? -25 : -40} />
    </View>
  );
}

const ApplicationReceivedChatWS = props => (
  <SocketContext.Consumer>
    {socket => <ApplicationReceivedChat {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ApplicationReceivedChatWS;

ApplicationReceivedChatWS.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: HeaderStyles.headerStyle,
    headerTitleStyle: HeaderStyles.headerTitleStyle,
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.state.params.onGoBack();
          navigation.goBack();
        }}
      >
        <Ionicons
          name={"ios-arrow-back"}
          size={25}
          style={{ marginLeft: 10, padding: 10 }}
          color={"#10476C"}
        ></Ionicons>
      </TouchableOpacity>
    )
  };
};