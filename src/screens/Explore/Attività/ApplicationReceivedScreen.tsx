import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ScrollView } from 'react-native-gesture-handler';
import ReceivedCard from '../../../shared/components/ReceivedCard';
import TenditSpinner from '../../../shared/graphql/TenditSpinner';
import HeaderLeft from '../../../shared/components/HeaderLeft';
import SocketContext from '../../../shared/SocketContext';
import { APPLICATIONS_FOR_POST } from '../../../shared/apollo/query/ApplicationReceivedScreen.query';
import {
  CLOSE_POSITION_FOR_APPLICATION,
} from '../../../shared/apollo/mutation/ApplicationReceivedScreen.mutation';
import UNSEEAPPLICATIONCHAT_MUTATION  from '../../../shared/apollo/mutation/shared.UnseeApplicationChat.mutation';
import CREATEPOSTMESSAGE_MUTATION  from '../../../shared/apollo/mutation/shared.CreatePostMessageMutation';
import { sendNotification } from '../../../shared/functions/PushNotifications';
var shortid = require('shortid');

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function ApplicationReceivedScreen({ socket, navigation }) {
  const id = navigation.getParam('id', null);

  const onClosePosition = (application) => {
    closePosition({
      variables: {
        postId: application.post.id,
        applicationId: application.id,
      },
    }).then(() => {
      createMessage({
        variables: {
          text: 'Complimenti, sei stato accettato',
          applicationId: application.id,
          subId: application.to.id,
        },
      });
    });
  };

  useEffect(() => {
    wait(100).then(() => refetch());
  }, [socket.refetch]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  //query
  const { refetch, data, loading } = useQuery(APPLICATIONS_FOR_POST, {
    variables: { postId: id },
    fetchPolicy: 'no-cache',
  });

  //MUTATIONS
  const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION, {
    onCompleted: () => {
      refetch();
      socket.setRefetch(Math.floor(Math.random() * -1000));
    },
  });

  const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION, {
    onCompleted: async ({ createPostMessage }) => {
      socket.socket.emit('chat message', {
        to: createPostMessage.application.from.id,
        createPostMessage,
        applicationId: createPostMessage.application.id,
      });
      sendNotification(
        createPostMessage.sub.pushToken,
        createPostMessage.application.to.nome,
        createPostMessage.text,
      );
      unseeChat({
        variables: { id: createPostMessage.application.id, subRead: false },
      });
      refetch();
    },
    onError: (error) => {
      alert('Qualcosa è andato storto');
    },
  });

  const [closePosition] = useMutation(CLOSE_POSITION_FOR_APPLICATION);

  if (loading) return <TenditSpinner />;

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={{ backgroundColor: '#F7F4F4' }}>
      {data.applicationsForPosition.length > 0 &&
        data.applicationsForPosition.map((application) => {
          return (
            <ReceivedCard
              onClosePosition={onClosePosition}
              onPress={() => {
                navigation.navigate('Chat', {
                  applicationTitle: application.post.titolo,
                  isReceived: true,
                  pubId: application.to.id,
                  pubNome: application.to.nome,
                  pubPicture: application.to.pictureUrl,
                  subId: application.from.id,
                  applicationId: application.id,
                  onGoBack: () => {},
                });
                unseeChat({
                  variables: {
                    id: application.id,
                    pubRead: true,
                  },
                });
              }}
              navigation={navigation}
              key={shortid.generate()}
              application={application}></ReceivedCard>
          );
        })}
    </ScrollView>
  );
}

const ApplicationReceivedScreenWS = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ApplicationReceivedScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
);

ApplicationReceivedScreenWS.navigationOptions = ({ navigation }) => {
  return {
    title: null,
    headerLeft: () => <HeaderLeft navigation={navigation}></HeaderLeft>,
  };
};

export default ApplicationReceivedScreenWS;
