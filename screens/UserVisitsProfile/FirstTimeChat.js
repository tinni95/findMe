import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, TouchableOpacity } from "react-native"
import InputToolbar from "../MessaggiStack/InputToolbar"
import FindMeMessage from "../MessaggiStack/FindMeMessage"
import { useMutation, useSubscription, useQuery } from 'react-apollo';
import { parseMessages } from "../MessaggiStack/helpers"
import { gql } from 'apollo-boost';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { sendNotification } from '../../shared/PushNotifications'
import HeaderStyles from '../shared/HeaderStyles'
import { Ionicons } from '@expo/vector-icons'
import { isSmallDevice } from '../../constants/Layout'


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

const CREATECHAT_MUTATION = gql`
mutation createChat($subId: ID!) {
    createChat(subId:$subId) {
        sub{
            pictureUrl
        }
        id
    }
}`;

const MESSAGES_QUERY = gql`
query chatQuery($id:ID!){
    currentUser{
        pictureUrl
    }
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


export default function FirstTimeChat({ navigation }) {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [chatId, setChatId] = useState("")
    const isSub = false;
    const subId = navigation.getParam("id")

    const { loading, error, data, refetch } = useQuery(
        MESSAGES_QUERY, {
        variables: { id: chatId },
        onCompleted: async ({ Chat, currentUser }) => {
            console.log("Chat", currentUser)
        }
    }
    )

    const [unseeChat] = useMutation(UNSEECHAT_MUTATION, {
        onCompleted: async ({ unseeChat }) => {
            console.log(unseeChat)
        },
    })

    const [createChat] = useMutation(CREATECHAT_MUTATION, {
        onCompleted: async ({ createChat }) => {
            setChatId(createChat.id)
            refetch()
            createMessage({ variables: { text: message, channelId: createChat.id } })
        },
    })

    const [createMessage] = useMutation(CREATEMESSAGE_MUTATION,
        {
            onCompleted: async ({ createMessage }) => {
                isSub ? unseeChat({ variables: { chatId, pubRead: false } }) :
                    unseeChat({ variables: { chatId, subRead: false } })
                isSub ? sendNotification(data.Chat.pub.pushToken, "Messaggio da " + data.Chat.sub.nome, createMessage.text) :
                    sendNotification(data.Chat.sub.pushToken, "Messaggio da " + data.Chat.pub.nome, createMessage.text)
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        data && setMessages(parseMessages(data.Chat.messages, subId))
        console.log("data", data)
    }, [data])


    useEffect(() => {
        message != "" ? createChat({ variables: { subId } }) : null
    }, [message])


    const onSend = (message) => {
        if (chatId.length > 0) {
            createMessage({ variables: { text: message, channelId: chatId } })
        }
        else {
            setMessage(message)
        }
    }


    const renderMessage = props => {

        return <FindMeMessage {...props} />
    }

    const renderInputToolbar = props => {
        const image = { uri: null }
        return <InputToolbar image={image} onSend={onSend}></InputToolbar>

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
            <KeyboardSpacer topSpacing={isSmallDevice ? -25 : -45} />
        </View>
    )
}


FirstTimeChat.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle,
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate("UserVisitsProfileScreen", { refetch: true })}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={"#10476C"}
                ></Ionicons>
            </TouchableOpacity>
        )
    }
}