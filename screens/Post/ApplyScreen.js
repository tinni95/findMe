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

const CREATENOTIFICA_MUTATION = gql`
mutation createNotifica($text:String!,$type:String!, $id:ID!){
    createNotifica(text:$text, type:$type, id:$id){
        id
    }
}
`

const UNSEEAPPLICATION_MUTATION = gql`
mutation UnseeApplication($id:ID!,$pubRead:Boolean,$subRead:Boolean){
  UnseeApplication(id:$chatId,pubRead:$pubRead,subRead:$subRead){
        id
        subRead
        pubRead
    }
}
`

const CREATEAPPLICATION_MUTATION = gql`
mutation createApplication($positionId: ID!, $to:ID!) {
  createApplication(positionId:$positionId, to:$to) {
        id
        to{
          id
        }
        from{
          id
          nome
          cognome
        }
        position{
          title
        }
    }
}`;

const CREATEPOSTMESSAGE_MUTATION = gql`
mutation createPostMessage($applicationId: ID!,$text:String!, $subId:ID!) {
  createPostMessage(applicationId:$applicationId,text:$text, subId:$subId) {
        id
        application{
          from{
            id
            nome
          }
          to{
            id
            pushToken
          }
        }
    }
}`;

export default function ApplyScreen({navigation}) {
  const post =navigation.getParam("post")
    const refetch =navigation.getParam("refetch")
    const position =navigation.getParam("position")
    const [messaggio,setMessaggio] = useState("")
    const [UnseeApplication] = useMutation(UNSEEAPPLICATION_MUTATION)
    const [createNotifica] = useMutation(CREATENOTIFICA_MUTATION)
    const [createApplication] = useMutation(CREATEAPPLICATION_MUTATION,
        {
          onCompleted: async ({ createApplication }) => {
            console.log(createApplication)
            createMessage({variables:{applicationId:createApplication.id,text:messaggio, subId:createApplication.to.id }})
            createNotifica({ variables: { type: "applicationPost", id: createApplication.to.id , text: createApplication.from.nome+ " " + createApplication.from.cognome + " si è applicato alla tua posizione di " + position.title } })
            UnseeApplication({variables:{id:createApplication.id,pubRead:false,subRead:false}})
          },
          onError: error => {
            console.log(error)
            alert("Qualcosa è andato storto")
          }
        });
    
        const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION,
            {
              onCompleted: async ({ createPostMessage }) => {
                sendNotification(createPostMessage.to.pushToken, createPostMessage.from.nome+ " si è applicato a un tuo post idea", createPostMessage.text)
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
            createApplication({ variables: { positionId: position.id, to:post.postedBy.id} }).then(() => {
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
                    <Light style={{ lineHeight: 20 }}>Scrivi a {post.postedBy.nome} Per informargli del tuo interesse per
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