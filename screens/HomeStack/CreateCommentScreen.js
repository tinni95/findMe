import React, { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Keyboard } from "react-native"
import { gql } from "apollo-boost"
import { useMutation, useQuery } from "react-apollo"
import HeaderBarComments from "./components/HeaderBarComments"
import { width } from "../../constants/Layout"
import AnswerCardAfter from "./components/AnswerCardAfter"
import InputToolbar from "../MessaggiStack/InputToolbar"
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay"
import CommentCard from "./components/CommentCard"
const CREATECOMMENT_MUTATION = gql`
mutation createComment($text:String!,$answerId:ID!){
    createComment(text:$text, answerId:$answerId){
        text
    }
}
`
const comments = gql`
query comments($id:ID!){
    commentsFeed(id:$id){
        id
        text
        createdAt
        postedBy{
            id
          nome
          cognome
        }
        id
    }
}
`
export default function CreateCommentScreen({ navigation }) {
    const question = navigation.getParam("question")
    const answer = navigation.getParam("answer")
    const [height, setHeight] = useState(false)
    const { loading, data, error, refetch } = useQuery(comments, { variables: { id: answer.id } })
    const [createComment] = useMutation(CREATECOMMENT_MUTATION,
        {
            onCompleted: async ({ createAnswer }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            _keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            _keyboardDidHide,
        );
    }, [])


    const _keyboardDidShow = (e) => {
        setHeight(e.endCoordinates.height)
    }

    const _keyboardDidHide = () => {
        setHeight(10)
    }

    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }
    if (error) {
        console.log(error)
        return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
    }
    return (
        <View style={styles.container}>
            <HeaderBarComments navigation={navigation} />
            <ScrollView>
                <AnswerCardAfter question={question} answer={answer}></AnswerCardAfter>

                {
                    data.commentsFeed.map(comment => {
                        return <CommentCard key={comment.id} comment={comment}></CommentCard>
                    })
                }
            </ScrollView>
            <InputToolbar onSend={(text) => createComment({ variables: { text, answerId: answer.id } })}></InputToolbar>
            <View style={{ height, backgroundColor: "white" }} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: "#F4F4F4"
    },
    input: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        width: '100%',
        fontSize: 12,
        fontFamily: "sequel-sans-light"
    },
    questionContainer: {
        alignSelf: 'baseline',
        width: width,
        borderBottomColor: '#F7F4F4',
        borderBottomWidth: 10,
        paddingBottom: 15
    }
})

CreateCommentScreen.navigationOptions = {
    header: null
}