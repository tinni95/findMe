import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View } from "react-native"
import InputToolbar from "./InputToolbar"
import gql from 'graphql-tag';
import { useMutation, useSubscription, useQuery } from 'react-apollo';
import parseMessages from "./helpers"
import FindMeMessage from './FindMeMessage'
import moment from 'moment/min/moment-with-locales'
import { sendNotification } from '../../shared/PushNotifications';
import KeyboardSpacer from 'react-native-keyboard-spacer';
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
    const chat = navigation.getParam("chat")
    const isSub = navigation.getParam("isSub")
    const id = navigation.getParam("id")
    console.log(chat.id)
    console.log(isSub)
    const { loading, error, data, refetch } = useQuery(
        MESSAGES_QUERY, { variables: { id: chat.id } }
    )
    const subscription = useSubscription(
        MESSAGES_SUBSCRIPTION,
        { variables: { id: chat.id } }
    );

    const [unseeChat] = useMutation(UNSEECHAT_MUTATION, {
        onCompleted: async ({ unseeChat }) => {
            console.log(unseeChat)
        },
    })

    const [createMessage] = useMutation(CREATEMESSAGE_MUTATION,
        {
            onCompleted: async ({ createMessage }) => {
                isSub ? unseeChat({ variables: { chatId: chat.id, pubRead: false } }) :
                    unseeChat({ variables: { chatId: chat.id, subRead: false } })
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
        createMessage({ variables: { text: message, channelId: chat.id } })
    }

    const renderMessage = props => {

        return <FindMeMessage {...props} />
    }

    const renderInputToolbar = props => {
        // Here you will return your custom InputToolbar.js file you copied before and include with your stylings, edits.
        console.log("props", props)
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