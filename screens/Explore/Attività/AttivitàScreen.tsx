import React, { useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import { SceneMap } from "react-native-tab-view";
import { ScrollView } from "react-native-gesture-handler";
import SentCard from "../../../shared/components/SentCard";
import TabBars from "../../../shared/components/TabBars";
import TenditSpinner from "../../../shared/graphql/TenditSpinner";
import { reOrderApplications } from "../../../shared/functions/reOrderApplications";
import PostApplicationCard from "../../../shared/components/PostApplicationCard";
import { wait } from "../../../shared/functions/wait";
import { headerTitleStyle } from "../../../shared/constants/HeaderStyles";
import SocketContext from "../../../shared/SocketContext"
//Apollo
import { useQuery, useMutation } from "@apollo/react-hooks";
import {USER_QUERY} from "../../../shared/apollo/query/AttivitàScreen.query"
import {UNSEEAPPLICATIONCHAT_MUTATION} from "../../../shared/apollo/mutation/Attivitàscreen.mutation"

var shortid = require("shortid");

function AttivitàScreen({ navigation , socket}) {

  const [refreshing, setRefreshing] = useState(false);
  const [isRefetch, setRefetch] = useState(false);
  const { refetch, data, loading } = useQuery(USER_QUERY, {
    fetchPolicy: "no-cache"
  });

  const [routes] = React.useState([
    { key: "first", title: "Inviate" },
    { key: "second", title: "Ricevute" }
  ]);
  useEffect(() => {
    wait(100).then(()=>{
      refetch();
      setRefetch(!isRefetch);
    })
  },[socket.refetch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefetch(!isRefetch);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION, {
    onCompleted: () => {
      refetch();
      socket.setRefetch( Math.floor(Math.random() * -1000))
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
                navigation.navigate("Chat", {
                  applicationId:application.id,
                  isReceived:false,
                  applicationTitle: application.post.titolo,
                  pubId:application.from.id,
                  pubNome: application.from.nome,
                  pubPicture: application.from.pictureUrl,
                  subId:application.to.id,
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


const AttivitàScreenWS = props => (
  <SocketContext.Consumer>
    {socket => <AttivitàScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
);

AttivitàScreenWS.navigationOptions = ({ navigation }) => {
  return {
    title:"Candidature",
    headerTitleStyle: headerTitleStyle
  }
}

export default AttivitàScreenWS;
