import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import gql from 'graphql-tag';
import { useMutation, useSubscription } from 'react-apollo';
import parseMessages from "./helpers"

const CREATEMESSAGE_MUTATION = gql`
mutation createMessage($channelId: ID!,$text:String!) {
    createMessage(channelId:$channelId,text:$text) {
        id
    }
}`;

const MESSAGES_SUBSCRIPTION = gql`
subscription messageReceivedSub($id:ID!){
    messageReceivedSub(id:$id){
      node{
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


export default function Chat({ navigation }) {
    const [messages, setMessages] = useState([])
    const chat = navigation.getParam("chat")
    const { data, loading } = useSubscription(
        MESSAGES_SUBSCRIPTION,
        { variables: { id: chat.id } }
    );
    const [createMessage] = useMutation(CREATEMESSAGE_MUTATION,
        {
            onCompleted: async ({ createMessage }) => {
                console.log(createMessage)
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        setMessages(parseMessages(chat.messages, chat.sub.id))
    }, [])


    useEffect(() => {
        !loading && data.messageReceivedSub.node.text ? setMessages(parseMessages([...messages, data.messageReceivedSub.node], chat.sub.id)) : null
    }, [data])

    const onSend = (message) => {
        createMessage({ variables: { text: message[0].text, channelId: chat.id } })
    }

    return (
        <GiftedChat
            inverted={false}
            messages={messages}
            onSend={message => onSend(message)}
            user={{
                _id: 1,
            }}
        />
    )
}