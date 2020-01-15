import React, { useState } from "react"
import { View, StyleSheet, Platform, ScrollView, RefreshControl } from "react-native"
import gql from "graphql-tag";
import ChatCard from "./ChatCard";
import { useQuery, useMutation } from "react-apollo";
import FindMeSpinner from "../../shared/FindMeSpinner";
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay";
import HeaderStyles from "../shared/HeaderStyles";

var shortid = require("shortid")
const SEECHAT_MUTATION = gql`
mutation seeChatMutation($chatId:ID!,$pubRead:Boolean,$subRead:Boolean){
    unseeChat(chatId:$chatId,pubRead:$pubRead,subRead:$subRead){
        id
        subRead
        pubRead
    }
}
`
const chatFeed = gql`
{
    ChatFeed{
      id
      pub{
        id
     nome
     pushToken
    }
      sub{
          id
       nome
       pushToken
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
    const [seeChat] = useMutation(SEECHAT_MUTATION, {
        onCompleted: async ({ unseeChat }) => {
            console.log(unseeChat)
        },
    });
    if (loading) return <FindMeSpinner />;
    if (error) return <FindMeGraphQlErrorDisplay />
    if (data) {
        const onRefresh = async () => {
            setRefreshing(true)
            refetch().then(() => setRefreshing(false))
        }


        return (
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.scene} >
                {data.ChatFeed.map(chat => {
                    const isSub = chat.sub.id == data.currentUser.id
                    return <ChatCard onPress={
                        () => {
                            refetch().then(() => {
                                isSub ? seeChat({ variables: { chatId: chat.id, subRead: true } }) :
                                    seeChat({ variables: { chatId: chat.id, pubRead: true } });
                                navigation.navigate("Chat", { chatId: chat.id, id: data.currentUser.id, isSub });
                            }
                            )
                        }
                    }
                        key={shortid.generate()} chat={chat} isSub={isSub}></ChatCard>
                })}
            </ScrollView>
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
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle
    }
}