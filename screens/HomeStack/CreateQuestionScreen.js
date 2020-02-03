import React, { useState } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import AvatarAndName from "./components/AvatarAndName"
import { gql } from "apollo-boost"
import { useMutation } from "react-apollo"
import HeaderBar from "./components/HeaderBar"

const CREATEQUESTION_MUTATION = gql`
mutation createQuestion($question:String!,$title:String!){
    createQuestion(question:$question, title:$title){
        question
    }
}
`

export default function CreateQuestionScreen({ navigation }) {
    const [createQuestion] = useMutation(CREATEQUESTION_MUTATION,
        {
            onCompleted: async ({ createQuestion }) => {
                console.log(createQuestion)
                navigation.navigate("HomeScreen", { refetch: true })
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    const [question, setQuestion] = useState("")
    const [title, setTitle] = useState("")
    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation} onPress={() => {
                question.length > 0 && title.length > 0 && createQuestion({ variables: { question, title } })
            }} />
            <View style={styles.innerContainer}>
                <AvatarAndName />
                <TextInput
                    style={styles.inputT}
                    placeholder="Scrivi titolo"
                    value={title}
                    onChangeText={title => setTitle(title)}
                />
                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="Scrivi qui il testo del tuo post"
                    value={question}
                    onChangeText={question => setQuestion(question)}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    innerContainer: {
        marginLeft: 20,
        marginRight: 20
    },
    inputT: {
        marginTop: 30,
        width: '100%',
        fontSize: 17,
        fontFamily: "sequel-sans"
    },
    input: {
        marginTop: 15,
        width: '100%',
        fontSize: 14,
        fontFamily: "sequel-sans"
    },
    inputTags: {
        marginTop: 20,
        width: '100%',
        fontSize: 12,
        fontFamily: "sequel-sans"
    }
})