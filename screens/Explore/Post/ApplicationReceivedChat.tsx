import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, TouchableOpacity, Platform } from "react-native";
import InputToolbar from "../../../shared/components/InputToolbar";
import TenditMessage from "../../../shared/components/Chat/TenditMessage";
import { useMutation, useQuery } from "react-apollo";
import { parsePostMessages } from "../../../shared/functions/ParsePostMessages";
import { gql } from "apollo-boost";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { sendNotification } from "../../../shared/functions/PushNotifications";
import { isSmallDevice } from "../../../shared/constants/Layout";
import moment from "moment/min/moment-with-locales";

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

export function ApplicationReceivedChat(props) {
  const [messages, setMessages] = useState([]);
  const id = props.route.params?.id;
  const application = props.route.params?.application;
  const { loading, error, data, refetch } = useQuery(MESSAGES_QUERY, {
    variables: { id: application.id },
  });
  const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION);

  const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION, {
    onCompleted: async ({ createPostMessage }) => {
      sendNotification(
        createPostMessage.sub.pushToken,
        application.from.nome,
        createPostMessage.text
      );
      unseeChat({ variables: { id: application.id, subRead: false } });
    },
    onError: error => {
      alert("Qualcosa è andato storto");
    }
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
    return <InputToolbar viewStyle={{backgroundColor:"white"}} image={image} onSend={onSend}></InputToolbar>;
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
         <KeyboardSpacer topSpacing={(isSmallDevice ? 25 :45)} />
    </View>
  );
}

export default ApplicationReceivedChat;
