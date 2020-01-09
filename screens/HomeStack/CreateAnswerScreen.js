import React, { useState } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import AvatarAndName from "./components/AvatarAndName"
import { gql } from "apollo-boost"
import { useMutation } from "react-apollo"
import HeaderBarAfter from "./components/HeaderBarAfter"
import { Body } from "../../components/StyledText"
import { width } from "../../constants/Layout"

const CREATEANSWER_MUTATION = gql`
mutation createAnswer($text:String!,$questionId:ID!){
    createAnswer(text:$text, questionId:$questionId){
        text
    }
}
`

export default function CreateAnswerScreen({ navigation }) {
    const question = navigation.getParam("question")
    console.log("question", question.id)
    const [createAnswer] = useMutation(CREATEANSWER_MUTATION,
        {
            onCompleted: async ({ createAnswer }) => {
                console.log(createAnswer)
                navigation.navigate("QuestionScreen", { refetch: true })
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    const [answer, setAnswer] = useState("")
    return (
        <View style={styles.container}>
            <HeaderBarAfter navigation={navigation} onPress={() => createAnswer({ variables: { questionId: question.id, text: answer } })} />
            <View style={styles.innerContainer}>
                <View style={styles.questionContainer}>
                    <Body style={{
                        fontSize: 17, marginLeft: 20,
                        marginRight: 20,
                    }}>{question.question}</Body>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        multiline
                        placeholder="Scrivi risposta.."
                        value={answer}
                        onChangeText={answer => setAnswer(answer)}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    input: {
        width: '100%',
        fontSize: 12,
        fontFamily: "sequel-sans-light"
    },
    inputWrapper: {
        margin: 20,
        marginTop: 10,
    },
    questionContainer: {
        alignSelf: 'baseline',
        width: width,
        borderBottomColor: '#F7F4F4',
        borderBottomWidth: 10,
        paddingBottom: 15
    }
})

CreateAnswerScreen.navigationOptions = {
    header: null
}