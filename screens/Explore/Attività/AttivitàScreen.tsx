import React, { useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import { SceneMap } from "react-native-tab-view";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";
import SentCard from "../../../shared/components/SentCard";
import TabBars from "../../../shared/components/TabBars";
import ReceivedCard from "../../../shared/components/ReceivedCard";
import TenditSpinner from "../../../shared/graphql/TenditSpinner";
import { reOrderApplications } from "../../../shared/functions/reOrderApplications";
import SocketContext from "../../../shared/SocketContext";
var shortid = require("shortid");
const User = gql`
  {
    UnseenSentApplications {
      id
    }
    UnseenReceivedApplications {
      id
    }
    currentUser {
      id
      applicationsSent {
        subRead
        pubRead
        id
        messages {
          createdAt
        }
        from {
          pictureUrl
          id
        }
        to {
          pictureUrl
          id
        }
        position {
          id
          closedFor {
            id
          }
          opened
          post {
            comune
            regione
            id
            hidden
            titolo
            postedBy {
              pictureUrl
              nome
              cognome
              id
            }
          }
          titolo
          requisiti
        }
      }
      applicationsReceived {
        id
        pubRead
        position {
          id
          closedFor {
            id
          }
          opened
          titolo
          requisiti
          post {
            id
          }
        }
        from {
          pictureUrl
          id
          nome
          cognome
          regione
          comune
        }
        position {
          post {
            titolo
            postedBy {
              nome
              cognome
            }
          }
        }
        to {
          pictureUrl
          id
        }
        messages {
          text
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const CLOSE_POSITION_FOR_APPLICATION = gql`
  mutation closePositionForApplication($positionId: ID!, $applicationId: ID!) {
    closePositionForApplication(
      positionId: $positionId
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

function AttivitàScreen({ navigation, socket }) {
  useEffect(() => {
    socket.on("postnotifica", msg => {
      console.log("NOTIFICA");
      wait(1000).then(() => refetch());
    });
  });

  const onClosePosition = application => {
    closePosition({
      variables: {
        positionId: application.position.id,
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
  const { refetch, data, loading } = useQuery(User, {
    fetchPolicy: "no-cache"
  });
  const [routes] = React.useState([
    { key: "first", title: "Inviate" },
    { key: "second", title: "Ricevute" }
  ]);
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

  const applicationSent = reOrderApplications(
    data.currentUser.applicationsSent
  );

  const applicationReceived = reOrderApplications(
    data.currentUser.applicationsReceived
  );

  const FirstRoute = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: "#F7F4F4" }}
    >
      {applicationSent.length > 0 &&
        applicationSent.map(application => {
          return (
            <SentCard
              onPress={() => {
                navigation.navigate("ApplicationSentChat", {
                  application,
                  id: application.from.id,
                  onGoBack: () => {}
                });
                unseeChat({
                  variables: {
                    id: application.id,
                    subRead: true
                  }
                });
              }}
              application={application}
              key={shortid.generate()}
              navigation={navigation}
            />
          );
        })}
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: "#F7F4F4" }}
    >
      {applicationReceived.length > 0 &&
        applicationReceived.map(application => {
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
                });
              }}
              id={data.currentUser.id}
              navigation={navigation}
              key={shortid.generate()}
              application={application}
            ></ReceivedCard>
          );
        })}
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  });

  return (
    <TabBars
      sent={data.UnseenSentApplications}
      received={data.UnseenReceivedApplications}
      renderScene={renderScene}
      routes={routes}
    ></TabBars>
  );
}

const AttivitàScreenWS = props => (
  <SocketContext.Consumer>
    {socket => <AttivitàScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default AttivitàScreenWS;
