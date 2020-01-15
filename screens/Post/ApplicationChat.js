import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View } from "react-native"
import InputToolbar from "../MessaggiStack/InputToolbar"
import FindMeMessage from "../MessaggiStack/FindMeMessage"
import { useMutation, useSubscription, useQuery } from 'react-apollo';
import { parsePostMessages } from "../MessaggiStack/helpers"
import { gql } from 'apollo-boost';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { sendNotification } from '../../shared/PushNotifications'


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
mutation createPostMessage($applicationId: ID!,$text:String!, $subId:ID!) {
    createPostMessage(applicationId:$applicationId, text:$text, subId:$subId) {
        id
        text
    }
}`;

const MESSAGES_QUERY = gql`
query chatQuery($id:ID!){
    PostMessagesFeed(id:$id){
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
    const id = navigation.getParam("id")
    const application = navigation.getParam("application")

    const { loading, error, data, refetch } = useQuery(
        MESSAGES_QUERY, {
        variables: { id: application.id },
        onCompleted: async ({ PostMessagesFeed }) => {
            console.log(PostMessagesFeed)
        }
    }
    )
    const subscription = useSubscription(
        POSTMESSAGES_SUBSCRIPTION,
        {
            variables: { id: application.id },
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
        console.log("data", data)
    }, [data])


    const onSend = (message) => {
        createMessage({ variables: { text: message, applicationId: application.id, subId: application.from.id } })
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