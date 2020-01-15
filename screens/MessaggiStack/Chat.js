import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, TouchableOpacity, Image } from "react-native"
import InputToolbar from "./InputToolbar"
import gql from 'graphql-tag';
import { useMutation, useSubscription, useQuery } from 'react-apollo';
import parseMessages from "./helpers"
import FindMeMessage from './FindMeMessage'
import moment from 'moment/min/moment-with-locales'
import { sendNotification } from '../../shared/PushNotifications';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Ionicons } from '@expo/vector-icons';
import HeaderStyles from '../shared/HeaderStyles';
import { Body, Light } from '../../components/StyledText';
import Colors from "../../constants/Colors"
moment.locale('it');

const UNSEECHAT_MUTATION = gql`
mutation unseeChatChatMutation($chatId:ID!,$pubRead:Boolean,$subRead:Boolean){
    unseeChat(chatId:$chatId,pubRead:$pubRead,subRead:$subRead){
        id
        subRead
        pubRead
    }
}
`

const CREATEMESSAGE_MUTATION = gql`
mutation createMessage($channelId: ID!,$text:String!) {
    createMessage(channelId:$channelId,text:$text) {
        id
        text
    }
}`;

const MESSAGES_QUERY = gql`
query chatQuery($id:ID!){
    Chat(id:$id){
        sub{
            nome
            pushToken
        }
        pub{
            nome
            pushToken
        }
        messages{
        id
        text
        createdAt
        user{
            id
            nome
        }
    }
    }
  }`;

const MESSAGES_SUBSCRIPTION = gql`
subscription messageReceivedSub($id:ID!){
    messageReceivedSub(id:$id){
        updatedFields
    }
  }`;


export default function Chat({ navigation }) {
    const [messages, setMessages] = useState([])
    const chatId = navigation.getParam("chatId")
    const isSub = navigation.getParam("isSub")
    const id = navigation.getParam("id")

    const { loading, error, data, refetch } = useQuery(
        MESSAGES_QUERY, { variables: { id: chatId }, fetchPolicy: "no-cache" }
    )
    const subscription = useSubscription(
        MESSAGES_SUBSCRIPTION,
        { variables: { id: chatId } }
    );

    const [unseeChat] = useMutation(UNSEECHAT_MUTATION, {
        onCompleted: async ({ unseeChat }) => {
            console.log(unseeChat)
        },
    })

    const [createMessage] = useMutation(CREATEMESSAGE_MUTATION,
        {
            onCompleted: async ({ createMessage }) => {
                isSub ? unseeChat({ variables: { chatId: chatId, pubRead: false } }) :
                    unseeChat({ variables: { chatId: chatId, subRead: false } })
                isSub ? sendNotification(data.Chat.pub.pushToken, "Messaggio da " + data.Chat.sub.nome, createMessage.text) :
                    sendNotification(data.Chat.sub.pushToken, "Messaggio da " + data.Chat.pub.nome, createMessage.text)
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        data && setMessages(parseMessages(data.Chat.messages, id))
        !loading && console.log("data", data)
    }, [data])


    useEffect(() => {
        !subscription.loading ? refetch() : null
    }, [subscription.data])

    const onSend = (message) => {
        createMessage({ variables: { text: message, channelId: chatId } })
    }

    const renderMessage = props => {

        return <FindMeMessage {...props} />
    }

    const renderInputToolbar = props => {
        // Here you will return your custom InputToolbar.js file you copied before and include with your stylings, edits.
        return <InputToolbar onSend={onSend}></InputToolbar>

    }
    return (
        <View style={{ flex: 1 }}>
            <GiftedChat
                inverted={false}
                messages={messages}
                onSend={message => onSend(message)}
                renderMessage={renderMessage}
                locale={'it'}
                renderInputToolbar={renderInputToolbar}
                user={{
                    _id: 1,
                }}
                listViewProps={{
                    style: {
                        backgroundColor: '#F4F4F4',
                    },
                }}
            />
            <KeyboardSpacer />
        </View>
    )
}

Chat.navigationOptions = ({ navigation }) => {
    const user = navigation.getParam("user")
    console
    return {
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle,
        headerLeft: (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Channels", { refetch: true })}>
                    <Ionicons
                        name={"ios-arrow-back"}
                        size={25}
                        style={{ marginLeft: 10, padding: 10 }}
                        color={"#10476C"}
                    ></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("UserVisitsProfileScreen", { id: user.id })} style={{ flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <Image source={require("../../assets/images/placeholder.png")} style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 10, marginRight: 10 }} />
                    <View style={{ flexDirection: "column" }}>
                        <Body style={{ fontSize: 12, color: Colors.blue }}>{user.nome + " " + user.cognome}</Body>
                        <Light style={{ fontSize: 9 }}>App developer Freelancer</Light>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}