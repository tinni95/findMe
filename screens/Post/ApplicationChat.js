import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View } from "react-native"

import { useMutation, useSubscription, useQuery } from 'react-apollo';
import { parsePostMessages } from "../MessaggiStack/helpers"
import { gql } from 'apollo-boost';


const UNSEEAPPLICATIONCHAT_MUTATION = gql`
mutation unseeApplicationChatChatMutation($applicationId:ID!,$pubRead:Boolean,$subRead:Boolean){
    unseeApplicationChatMutation(applicationId:$applicationId,pubRead:$pubRead,subRead:$subRead){
        id
        subRead
        pubRead
    }
}
`

const CREATEPOSTMESSAGE_MUTATION = gql`
mutation createPostMessage($applicationId: ID!,$text:String!) {
    createPostMessage(applicationId:$channelId,text:$text) {
        id
        text
    }
}`;

const MESSAGES_QUERY = gql`
query chatQuery($applicationId:ID!){
    PostMessagesFeed(applicationId:$applicationId){
        sub{
            pushToken
          id
        }
        pub{
            pushToken
          id
        }
        id
        text
        createdAt
    }
  }`;

const POSTMESSAGES_SUBSCRIPTION = gql`
subscription messageReceivedSub($id:ID!){
    postMessageReceivedSub(id:$id){
        updatedFields
    }
  }`;


export default function ApplicationChat({ navigation }) {
    const [messages, setMessages] = useState([])
    const isSub = navigation.getParam("isSub")
    const application = navigation.getParam("application")

    const { loading, error, data, refetch } = useQuery(
        MESSAGES_QUERY, { variables: { id: chat.id } }
    )
    const subscription = useSubscription(
        POSTMESSAGES_SUBSCRIPTION,
        {
            variables: { id: chat.id },
            onSubscriptionData: async ({ postMessageReceivedSub }) => {
                refetch()
            }
        }
    );

    const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION, {
        onCompleted: async ({ unseeChat }) => {
            console.log(unseeChat)
        },
    })

    const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION,
        {
            onCompleted: async ({ createPostMessage }) => {
                isSub ? unseeChat({ variables: { applicationId: application.id, pubRead: false } }) :
                    unseeChat({ variables: { applicationId: application.id, subRead: false } })
                isSub ? sendNotification(data.PostMessagesFeed.pub.pushToken, "Messaggio da " + data.PostMessagesFeed.sub.nome, createPostMessage.text) :
                    sendNotification(data.PostMessagesFeed.sub.pushToken, "Messaggio da " + data.PostMessagesFeed.pub.nome, createPostMessage.text)
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        data && setMessages(parsePostMessages(data.PostMessagesFeed, id))
        !loading && console.log("data", data)
    }, [data])


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