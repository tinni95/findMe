import React, { useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import { SceneMap } from "react-native-tab-view";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";
import SentCard from "../../../shared/components/SentCard";
import TabBars from "../../../shared/components/TabBars";
import TenditSpinner from "../../../shared/graphql/TenditSpinner";
import { reOrderApplications } from "../../../shared/functions/reOrderApplications";
import PostApplicationCard from "../../../shared/components/PostApplicationCard";
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
    }
    userPosts {
      opened
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


function AttivitàScreen({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);
  const [isRefetch, setRefetch] = useState(false);
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
    setRefetch(!isRefetch);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

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
                })
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
              isRefetch={isRefetch}
              opened={post.opened || false}
              navigation={navigation}
              key={post.id}
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

export default AttivitàScreen;
