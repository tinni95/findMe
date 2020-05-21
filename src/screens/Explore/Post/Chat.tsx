import React, { useState, useEffect } from 'react';
import { GiftedChat, LoadEarlier } from 'react-native-gifted-chat';
import { View, Text } from 'react-native';
import InputToolbar from '../../../shared/components/InputToolbar';
import TenditMessage from '../../../shared/components/Chat/TenditMessage';
import { useMutation, useQuery } from 'react-apollo';
import { parsePostMessages, parsePostMessage } from '../../../shared/functions/ParsePostMessages';
import { gql } from 'apollo-boost';
import SocketContext from '../../../shared/SocketContext';
import { sendNotification } from '../../../shared/functions/PushNotifications';
import HeaderLeft from '../../../shared/components/HeaderLeft';
import { headerTitleStyle } from '../../../shared/constants/HeaderStyles';
const UNSEEAPPLICATIONCHAT_MUTATION = gql`
  mutation unseeApplicationChatChatMutation($id: ID!, $pubRead: Boolean, $subRead: Boolean) {
    UnseeApplication(id: $id, pubRead: $pubRead, subRead: $subRead) {
      id
      subRead
      pubRead
    }
  }
`;
const CREATEPOSTMESSAGE_MUTATION = gql`
  mutation createPostMessage($applicationId: ID!, $text: String!, $subId: ID!) {
    createPostMessage(applicationId: $applicationId, text: $text, subId: $subId) {
      id
      pub {
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
  query chatQuery($id: ID!, $first: Int, $skip: Int) {
    PostMessagesFeed(id: $id, first: $first, skip: $skip) {
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

function Chat(props) {
  //navigation
  const {
    applicationId,
    applicationTitle,
    subId,
    pubId,
    pubNome,
    pubPicture,
    isReceived,
  } = props.navigation.state.params;

  //hooks
  const [messages, setMessages] = useState([]);
  const [skip, setSkip] = useState(0);
  const [addtoSkip, setAdd] = useState(0);

  //query
  const { loading, refetch } = useQuery(MESSAGES_QUERY, {
    variables: { id: applicationId, first: 10, skip },
    onCompleted: ({ PostMessagesFeed }) => {
      console.log('skip', skip);
      setMessages(GiftedChat.prepend(messages, parsePostMessages(PostMessagesFeed, pubId)));
    },
    fetchPolicy: 'no-cache',
  });

  //mutations
  const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION);
  const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION, {
    onCompleted: async ({ createPostMessage }) => {
      setMessages(GiftedChat.append(messages, parsePostMessage(createPostMessage, pubId)));
      setAdd(addtoSkip + 1);
      props.socket.socket.emit('chat message', {
        to: subId,
        createPostMessage,
        applicationId,
      });
      sendNotification(
        createPostMessage.sub.pushToken,
        pubNome + ' (' + applicationTitle + ')',
        createPostMessage.text,
      );
      isReceived
        ? unseeChat({ variables: { id: applicationId, subRead: false } })
        : unseeChat({ variables: { id: applicationId, pubRead: false } });
    },
    onError: (error) => {
      alert('Qualcosa è andato storto');
    },
  });

  //useEffect
  useEffect(() => {
    setSkip(0);
    refetch();
  }, []);

  useEffect(() => {
    if (
      props.socket.payload &&
      messages.length > 0 &&
      props.socket.payload.applicationId === applicationId
    ) {
      setMessages(
        GiftedChat.append(messages, parsePostMessage(props.socket.payload.message, pubId)),
      );
      setAdd(addtoSkip + 1);
      isReceived
        ? unseeChat({ variables: { id: applicationId, pubRead: true } })
        : unseeChat({ variables: { id: applicationId, subRead: true } });
    }
  }, [props.socket.payload]);

  //functions
  const onSend = (message) => {
    createMessage({
      variables: {
        text: message,
        applicationId,
        subId,
      },
    });
  };

  const fetchMore = () => {
    setSkip(skip + 10 + addtoSkip);
  };

  const renderMessage = (props) => {
    return <TenditMessage {...props} />;
  };

  const renderLoadEarlier = (props) => {
    return <LoadEarlier {...props} onLoadEarlier={fetchMore} label="Carica precedenti" />;
  };

  const renderInputToolbar = (props) => {
    const image = !loading && { uri: pubPicture };
    return (
      <InputToolbar
        viewStyle={{ backgroundColor: 'white' }}
        image={image}
        onSend={onSend}></InputToolbar>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        scrollToBottom={false}
        loadEarlier={true}
        inverted={true}
        messages={messages}
        onSend={(message) => onSend(message)}
        renderMessage={renderMessage}
        locale={'it'}
        renderInputToolbar={renderInputToolbar}
        renderLoadEarlier={renderLoadEarlier}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

//socket context
const ChatWS = (props) => (
  <SocketContext.Consumer>{(socket) => <Chat {...props} socket={socket} />}</SocketContext.Consumer>
);

//navigation
ChatWS.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerTitleStyle,
    title: navigation.getParam('applicationTitle', null),
    headerLeft: () => <HeaderLeft navigation={navigation}></HeaderLeft>,
  };
};

export default ChatWS;
