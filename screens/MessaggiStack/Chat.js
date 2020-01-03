import React, { useState, useEffect } from 'react'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import gql from 'graphql-tag';
import { View } from "react-native"
import { useMutation, useSubscription } from 'react-apollo';
import parseMessages from "./helpers"
import FindMeMessage from './FindMeMessage'
import moment from 'moment/min/moment-with-locales'
moment.locale('it');

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
    const id = navigation.getParam("id")

    const { data, loading } = useSubscription(
        MESSAGES_SUBSCRIPTION,
        { variables: { id: chat.id } }
    );
    const [createMessage] = useMutation(CREATEMESSAGE_MUTATION,
        {
            onCompleted: async ({ createMessage }) => {

            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        setMessages(parseMessages(chat.messages, id))
    }, [])


    useEffect(() => {
        !loading && data.messageReceivedSub.node.text ? setMessages(parseMessages([...messages, data.messageReceivedSub.node], id)) : null
    }, [data])

    const onSend = (message) => {
        createMessage({ variables: { text: message[0].text, channelId: chat.id } })
    }

    const renderMessage = props => {

        return <FindMeMessage {...props} />
    }

    const renderInputToolbar = props => {
        // Here you will return your custom InputToolbar.js file you copied before and include with your stylings, edits.
        return <InputToolbar {...props} />

    }
    return (

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
            style={{ backgroundColor: 'black' }}
        />
    )
}