import React , {useState} from "react"
import { View, Text, Platform, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../../constants/Colors"
import { Light, Body } from "../../components/StyledText"
import gql from 'graphql-tag';
import StepsLabelDefault from "../shared/StepsLabel"
import FormTextInput from "../shared/Form/FormTextInput"
import { FormStyles } from "../shared/Form/FormStyles"
import RoundButton from "../../components/shared/RoundButton"
import {  useMutation } from '@apollo/react-hooks';
import * as Haptics from 'expo-haptics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { sendNotification } from "../../shared/PushNotifications"
import HeaderStyles from "../shared/HeaderStyles"

const CREATEAPPLICATION_MUTATION = gql`
mutation createApplication($postId: ID!, $positionId:ID!) {
  createApplication(postId:$postId,positionId:$positionId) {
        id
        position{
          title
        }
    }
}`;

const CREATECHAT_MUTATION = gql`
mutation createChat($subId: ID!) {
    createChat(subId:$subId) {
        id
    }
}`;

const CREATEMESSAGE_MUTATION = gql`
mutation createMessage($channelId: ID!,$text:String!) {
    createMessage(channelId:$channelId,text:$text) {
        id
    }
}`;

export default function ApplyScreen({navigation}) {

    const post =navigation.getParam("post")
    const refetch =navigation.getParam("refetch")
    const position =navigation.getParam("position")
    const [messaggio,setMessaggio] = useState("")

    const [createApplication] = useMutation(CREATEAPPLICATION_MUTATION,
        {
          onCompleted: async ({ createApplication }) => {

            createChat({variables:{subId:post.postedBy.id}})
          },
          onError: error => {

            alert("Qualcosa è andato storto")
          }
        });

        const [createChat] = useMutation(CREATECHAT_MUTATION,
            {
              onCompleted: async ({ createChat }) => {

                createMessage({variables:{text:messaggio,channelId:createChat.id}})
              },
              onError: error => {
                console.log(error)
                alert("Qualcosa è andato storto")
              }
            });
    
            const [createMessage] = useMutation(CREATEMESSAGE_MUTATION,
                {
                  onCompleted: async ({ createMessage }) => {
                    alert("success")

                  },
                  onError: error => {
                    console.log(error)
                    alert("Qualcosa è andato storto")
                  }
                });

        const handleApply = () => {

            if(messaggio.length===0){
                return alert("aoh el messaggio")
            }
            createApplication({ variables: { positionId: position.id, postId: post.id } }).then(() => {
              refetch()
            }).then(() => {
              sendNotification({
                to: post.postedBy.pushToken,
                title: post.title,
                body: "Qualcuno si è applicato alla tua posizione di " + position.title
              })
              Haptics.selectionAsync()
              navigation.goBack()
            })
        
          }
    return (
        <KeyboardAwareScrollView>
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <View style={styles.spacer} />
                <Text>
                    <Light style={{ lineHeight: 20 }}>Scrivi a {post.pubblicatoDa} Per informargli del tuo interesse per
la posizione di</Light>
                    <Body> "{position.title}"</Body>
                </Text>
                <View style={styles.spacer} />
                <StepsLabelDefault text={"Messaggio"} />
                <FormTextInput
                    large="true"
                    multiline
                    numberOfLines={4}
                    placeholder="Esempio:
                    (Ho competenze in … Vorrei candidarmi come….)"
                    placeholderTextColor="#ADADAD"
                    textAlignVertical={"top"}
                    style={FormStyles.xlarge}
                    onChangeText={val => setMessaggio(val)}
                    value={messaggio}
                />
                <View style={styles.buttonWrapper}>
                <RoundButton text={" Invia "} color={Colors.red} textColor={"white"} onPress={()=>handleApply()}></RoundButton>
                </View>
            </View>
        </View>
        </KeyboardAwareScrollView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textWrapper: {
        margin: 30,
    },
    spacer: {
        height: 25
    },
    buttonWrapper:{
        alignItems:"center",
        justifyContent:"center",
        margin:40
    }
})
ApplyScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle,
        headerLeft: (
            <TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => navigation.goBack()}>
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