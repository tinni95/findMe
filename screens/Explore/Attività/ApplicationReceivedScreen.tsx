import React, { useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";
import ReceivedCard from "../../../shared/components/ReceivedCard";
import TenditSpinner from "../../../shared/graphql/TenditSpinner";
import SocketContext from "../../../shared/SocketContext";
var shortid = require("shortid");

const CREATENOTIFICA_MUTATION = gql`
  mutation createNotifica($text: String!, $type: String!, $id: ID!) {
    createNotifica(text: $text, type: $type, id: $id) {
      to {
        id
      }
    }
  }
`;

const APPLICATIONS_FOR_POST = gql`
  query applicationsForPosition($postId: ID!) {
    applicationsForPosition(postId: $postId) {
      pubRead
      id
      to {
        id
      }
      messages{
        text
      }
      from {
        nome
        cognome
        comune
        regione
        id
        pictureUrl
      }
      post {
        closedFor {
        id
      }
        opened
        id
        titolo
      }
    }
  }
`;

const CLOSE_POSITION_FOR_APPLICATION = gql`
  mutation closePositionForApplication($postId: ID!, $applicationId: ID!) {
    closePositionForApplication(
      postId: $postId
      applicationId: $applicationId
    ) {
      id
    }
  }
`;

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
      application {
        pubRead
        to {
          id
          nome
        }
        post {
          titolo
        }
        id
      }
    }
  }
`;

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function ApplicationReceivedScreen({ route,navigation, socket }) {
  const id= route.params?.id;
  useEffect(() => {
    socket.on("postnotifica", msg => {
      wait(1000).then(() => refetch());
    });
  });

  const onClosePosition = application => {
    closePosition({
      variables: {
        postId: application.post.id,
        applicationId: application.id
      }
    }).then(() => {
      createMessage({
        variables: {
          text: "Complimenti, sei stato accettato",
          applicationId: application.id,
          subId: application.to.id
        }
      });
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  const { refetch, data, loading } = useQuery(APPLICATIONS_FOR_POST, {
    variables: { postId: id },
    fetchPolicy: "no-cache"
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION, {
    onCompleted: () => {
      refetch();
    }
  });

  const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION, {
    onCompleted: async ({ createPostMessage }) => {
      unseeChat({
        variables: { id: createPostMessage.application.id, pubRead: false }
      });
      refetch();
    },
    onError: error => {
      alert("Qualcosa è andato storto");
    }
  });

  const [closePosition] = useMutation(CLOSE_POSITION_FOR_APPLICATION);

  if (loading) return <TenditSpinner />;
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: "#F7F4F4" }}
    >
      {data.applicationsForPosition.length > 0 &&
        data.applicationsForPosition.map(application => {
          return (
            <ReceivedCard
              onClosePosition={onClosePosition}
              onPress={() => {
                navigation.navigate("ApplicationReceivedChat", {
                  id: application.to.id,
                  application,
                  onGoBack: () => {}
                });
                unseeChat({
                  variables: {
                    id: application.id,
                    pubRead: true
                  }
                }).then(()=>{
                  socket.emit("postnotifica",application.to.id);
                });
              }}
              navigation={navigation}
              key={shortid.generate()}
              application={application}
            ></ReceivedCard>
          );
        })}
    </ScrollView>
  );
}

const ApplicationReceivedScreenWS = props => (
  <SocketContext.Consumer>
    {socket => <ApplicationReceivedScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ApplicationReceivedScreenWS;
