import React, { useState } from "react"
import { View, StyleSheet, Platform, ScrollView, RefreshControl } from "react-native"
import TabBars from "../../shared/TabBars";
import { SceneMap } from "react-native-tab-view";
import Colors from "../../constants/Colors";
import gql from "graphql-tag";
import ChatCard from "./ChatCard";
import { useQuery } from "react-apollo";
import FindMeSpinner from "../../shared/FindMeSpinner";
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay";
var shortid = require("shortid")

const chatFeed = gql`
{
    ChatFeed{
      id
      pub{
        id
     nome
    }
      sub{
          id
       nome
      }
      messages{
          id
        createdAt
        user{
            id
            nome
        }
        text
        chat{
          id
        }
      }
    }
    currentUser{
        id
    }
  }
`
export default function Channels({ navigation }) {
    const { loading, error, data, refetch } = useQuery(chatFeed, { fetchPolicy: "no-cache" });
    const [refreshing, setRefreshing] = useState(false)
    const [routes] = React.useState([
        { key: 'first', title: 'Chat' },
        { key: 'second', title: 'Post Idea' },
    ]);

    if (loading) return <FindMeSpinner />;
    if (error) return <FindMeGraphQlErrorDisplay />
    if (data) {
        const onRefresh = async () => {
            setRefreshing(true)
            refetch().then(() => setRefreshing(false))
        }

        const FirstRoute = () => (
            <View style={styles.scene} />
        );

        const SecondRoute = () => (
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.scene} >
                {data.ChatFeed.map(chat => {
                    const isSub = chat.sub.id == data.currentUser.id
                    return <ChatCard onPress={() => navigation.navigate("Chat", { chat })} key={shortid.generate()} chat={chat} isSub={isSub}></ChatCard>
                })}
            </ScrollView>
        );
        const renderScene = SceneMap({
            first: FirstRoute,
            second: SecondRoute,
        });

        return (
            <TabBars renderScene={renderScene} routes={routes}></TabBars>
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

Channels.navigationOptions = ({ navigation }) => {
    return {
        title: "Messaggi",
        headerStyle: {
            ...Platform.select({
                ios: {
                    shadowColor: "black",
                    shadowOffset: { height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3
                },
                android: {
                    elevation: 20
                },
            })
        },
        headerTitleStyle: {
            fontFamily: "sequel-sans-bold",
            color: Colors.blue,
            fontSize: 12
        },
    }
}