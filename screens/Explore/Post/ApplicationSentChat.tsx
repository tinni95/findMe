import React, { useState, useEffect } from "react";
import { GiftedChat, LoadEarlier } from "react-native-gifted-chat";
import { View, Text } from "react-native";
import InputToolbar from "../../../shared/components/InputToolbar";
import TenditMessage from "../../../shared/components/Chat/TenditMessage";
import { useMutation, useQuery } from "react-apollo";
import { parsePostMessages,parsePostMessage } from "../../../shared/functions/ParsePostMessages";
import { gql } from "apollo-boost";
import SocketContext from "../../../shared/SocketContext"
import { sendNotification } from "../../../shared/functions/PushNotifications";
import HeaderLeft from "../../../shared/components/HeaderLeft";

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
      pub{
        id
        pictureUrl
      }
      sub {
        pictureUrl
        id 
        nome
        pushToken
      }
      text
      createdAt
    }
  }
`;

const MESSAGES_QUERY = gql`
  query chatQuery($id: ID!, $first: Int, $skip:Int) {
    PostMessagesFeed(id: $id, first:$first, skip:$skip) {
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

function ApplicationSentChat(props) {
  const [messages, setMessages] = useState([]);
  const id = props.navigation.getParam("id",null)
  const application =props.navigation.getParam("application",null)
  /*
   applicationsSent {
        subRead
        pubRead
        id
        messages {
          createdAt
        }
        from {
          pictureUrl
          nome
          id
        }
        to {
          nome
          pictureUrl
          id
        }
        post {
          id
          closedFor {
            id
          }
          postedBy {
            pictureUrl
            nome
            cognome
            id
          }
          opened
          comune
          regione
          id
          hidden
          titolo
          titolo
          requisiti
        }
      }
       */
  const [skip,setSkip] = useState(0)
  const [first,setFirst] = useState(10)
  const { loading} = useQuery(MESSAGES_QUERY, {
    variables: { id: application.id, first, skip },
    onCompleted : ({PostMessagesFeed}) => {
    if(first==10){
    setMessages(GiftedChat.prepend(
      messages,
      parsePostMessages(PostMessagesFeed,id)
      ))
    }
    }
  });
  const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION);

  const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION, {
    onCompleted: async ({ createPostMessage }) => {
      sendNotification(
        createPostMessage.sub.pushToken,
        application.from.nome,
        createPostMessage.text
      );
      setMessages(GiftedChat.append(
        messages,
        parsePostMessage(createPostMessage,id)
        ))
      unseeChat({ variables: { id: application.id, pubRead: false } });
    },
    onError: error => {
      alert("Qualcosa è andato storto");
    }
  });


  const onSend = message => {
    createMessage({
      variables: {
        text: message,
        applicationId: application.id,
        subId: application.to.id
      }
    });
    wait(50).then(()=>{
      props.socket.socket.emit("chat message",application.to.id)
    })
  };

  useEffect(() => {
    console.log("refetch")
  },[props.socket.refetch]);

  const fetchMore = () => {
    setSkip(skip+10)
  }

  const renderMessage = props => {
    return <TenditMessage {...props} />;
  };

  const renderLoadEarlier = (props) => 
  {
  return <LoadEarlier {...props} onLoadEarlier={fetchMore} label="Carica precedenti" />
  }

  const renderInputToolbar = props => {
    const image = !loading && { uri: application.from.pictureUrl };
    return <InputToolbar viewStyle={{backgroundColor:"white"}}image={image} onSend={onSend}></InputToolbar>;
  };
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        scrollToBottom={false}
        loadEarlier={true}
        inverted={true}
        messages={messages}
        onSend={message => onSend(message)}
        renderMessage={renderMessage}
        locale={"it"}
        renderInputToolbar={renderInputToolbar}
        renderLoadEarlier={renderLoadEarlier}
        user={{
          _id: 1
        }}
      />
    </View>
  );
}

const ApplicationSentChatWS = props => (
  <SocketContext.Consumer>
    {socket => <ApplicationSentChat {...props} socket={socket} />}
  </SocketContext.Consumer>
);

ApplicationSentChatWS.navigationOptions = ({ navigation }) => {
  return {
    title:null,
    headerLeft: <HeaderLeft navigation={navigation}></HeaderLeft>,
  }
}

export default ApplicationSentChatWS;