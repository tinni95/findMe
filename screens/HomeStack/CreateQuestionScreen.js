import React, { useState } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import AvatarAndName from "./components/AvatarAndName"
import { gql } from "apollo-boost"
import { useMutation } from "react-apollo"
import HeaderBar from "./components/HeaderBar"

const CREATEQUESTION_MUTATION = gql`
mutation createQuestion($question:String!,$tags:String){
    createQuestion(question:$question, tags:$tags){
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
    const [tags, setTags] = useState("")
    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation} onPress={() => {
                question.length > 0 && createQuestion({ variables: { question, tags } })
            }} />
            <View style={styles.innerContainer}>
                <AvatarAndName />
                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="Domanda qualcosa alla community di findMe"
                    value={question}
                    onChangeText={question => setQuestion(question)}
                />
                <TextInput
                    style={styles.inputTags}
                    multiline
                    placeholder="Aggiungi Tag : #Startup"
                    value={tags}
                    onChangeText={tag => {
                        if (tag.length == 1) {
                            setTags("#" + tag)
                        }
                        else {
                            if (tag[tag.length - 1] == " ") {
                                setTags(tag + "#")
                            }
                            else
                                setTags(tag)
                        }
                    }
                    }
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
    input: {
        marginTop: 10,
        width: '100%',
        fontSize: 17,
        fontFamily: "sequel-sans"
    },
    inputTags: {
        marginTop: 20,
        width: '100%',
        fontSize: 12,
        fontFamily: "sequel-sans"
    }
})