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
import { groupApplications } from "../../../shared/functions/groupApplications";
import PostApplicationCard from "../../../shared/components/PostApplicationCard";
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
    }
    userPosts {
      id
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

function AttivitàScreen({ navigation, socket }) {
  useEffect(() => {
    socket.on("postnotifica", msg => {
      console.log("NOTIFICA");
      wait(1000).then(() => refetch());
    });
  });

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

  const [createNotifica] = useMutation(CREATENOTIFICA_MUTATION, {
    onCompleted: ({ createNotifica }) => {
      console.log(createNotifica);
      socket.emit("postnotifica", createNotifica.to.id);
    },
    onError: error => {
      console.log("notifica");
      console.log(error);
    }
  });

  const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION, {
    onCompleted: () => {
      refetch();
    }
  });

  if (loading) return <TenditSpinner />;

  const applicationSent = reOrderApplications(
    data.currentUser.applicationsSent
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

  const Received = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: "#F7F4F4" }}
    >
      {data.userPosts.length > 0 &&
        data.userPosts.map(post => {
          return (
            <PostApplicationCard
              opened={post.opened}
              navigation={navigation}
              id={post.id}
            />
          );
        })}
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: Received
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
