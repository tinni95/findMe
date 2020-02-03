import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from "react-native"
import gql from "graphql-tag";
import ChatCard from "./ChatCard";
import { useQuery, useMutation, useSubscription } from "react-apollo";
import FindMeSpinner from "../../shared/FindMeSpinner";
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay";
import HeaderStyles from "../shared/HeaderStyles";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

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
        subRead
        pubRead
      id
      pub{
        id
     nome
     cognome
     pushToken
     pictureUrl
    }
      sub{
          id
          pictureUrl
       nome
       cognome
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

const MESSAGES_SUBSCRIPTION = gql`
subscription messageReceivedNotificaSub($id:ID!){
    messageReceivedNotificaSub(id:$id){
        updatedFields
    }
  }`;

export default function Channels({ navigation }) {
    const isRefetch = navigation.getParam("refetch") || null
    const { loading, error, data, refetch } = useQuery(chatFeed, { fetchPolicy: "no-cache" });
    const [refreshing, setRefreshing] = useState(false)
    const [seeChat] = useMutation(SEECHAT_MUTATION);

    useEffect(() => {
        isRefetch ? refetch() : null
    }, [isRefetch])


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
                    return <ChatCard isSub={isSub}
                        chat={chat}
                        onPress={
                            () => {
                                isSub ? seeChat({ variables: { chatId: chat.id, subRead: true } }) :
                                    seeChat({ variables: { chatId: chat.id, pubRead: true } });
                                isSub ?
                                    navigation.navigate("Chat", {
                                        chatId: chat.id, id: data.currentUser.id, isSub, user: chat.pub,
                                        onGoBack: () => refetch()
                                    }) :
                                    navigation.navigate("Chat", {
                                        chatId: chat.id, id: data.currentUser.id, isSub,
                                        user: chat.sub, onGoBack: () => refetch()
                                    }
                                    );
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
        headerTitleStyle: HeaderStyles.headerTitleStyle,
        headerLeft: (
            <TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => {
                navigation.state.params.onGoBack();
                navigation.goBack()
            }}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}