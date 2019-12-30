import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const CREATEMESSAGE_MUTATION = gql`
mutation createMessage($channelId: ID!,$text:String!) {
    createMessage(channelId:$channelId,text:$text) {
        id
    }
}`;


const parseMessages = (messages) => {
    return messages.map(message => {
        return {
            ...message,
            _id: message.id,
            user: {
                _id: message.user.id,
                name: message.user.nome,
                avatar: 'https://placeimg.com/140/140/any',
            }
        }
    })
}

export default function Chat({ navigation }) {
    state = {
        messages: [],
    }
    const [messages, setMessages] = useState([])
    const chat = navigation.getParam("chat")
    const [createMessage] = useMutation(CREATEMESSAGE_MUTATION,
        {
            onCompleted: async ({ createMessage }) => {
                alert("success")
                console.log(createMessage)
            },
            onError: error => {
                console.log(error)
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        setMessages(parseMessages(chat.messages))
    }, [])

    const onSend = (message) => {
        console.log(message)
        createMessage({ variables: { text: message[0].text, channelId: chat.id } })
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={message => onSend(message)}
            user={{
                _id: 1,
            }}
        />
    )
}