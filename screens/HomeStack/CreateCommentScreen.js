import React, { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Keyboard, RefreshControl } from "react-native"
import { gql } from "apollo-boost"
import { useMutation, useQuery } from "react-apollo"
import HeaderBarComments from "./components/HeaderBarComments"
import { width } from "../../constants/Layout"
import AnswerCardAfter from "./components/AnswerCardAfter"
import InputToolbar from "../MessaggiStack/InputToolbar"
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay"
import CommentCard from "./components/CommentCard"
import { useActionSheet } from '@expo/react-native-action-sheet'
import KeyboardSpacer from 'react-native-keyboard-spacer';

const CREATECOMMENT_MUTATION = gql`
mutation createComment($text:String!,$answerId:ID!){
    createComment(text:$text, answerId:$answerId){
        text
    }
}
`

const DELETECOMMENT_MUTATION = gql`
mutation deleteComment($id:ID!){
    deleteComment(id:$id){
        id
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
    currentUser{
        id
    }
}
`

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function CreateCommentScreen({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);



    const { showActionSheetWithOptions } = useActionSheet();
    const options = ['Delete', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    const question = navigation.getParam("question")
    const answer = navigation.getParam("answer")
    const [height, setHeight] = useState(false)
    const [commentId, setId] = useState("")
    const { loading, data, error, refetch } = useQuery(comments, { variables: { id: answer.id }, fetchPolicy: "no-cache" })
    const [createComment] = useMutation(CREATECOMMENT_MUTATION,
        {
            onCompleted: async ({ createAnswer }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });
    const [deleteComment] = useMutation(DELETECOMMENT_MUTATION,
        {
            onCompleted: async ({ createAnswer }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        commentId != "" && deleteComment({ variables: { id: commentId } })
    }, [commentId])

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
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <AnswerCardAfter question={question} answer={answer}></AnswerCardAfter>
                {
                    data.commentsFeed.map(comment => {
                        return <CommentCard onLongPress={() => {
                            if (data.currentUser.id == comment.postedBy.id) {
                                showActionSheetWithOptions(
                                    {
                                        options,
                                        cancelButtonIndex,
                                        destructiveButtonIndex,
                                    },
                                    buttonIndex => {
                                        if (buttonIndex == 0) {
                                            setId(comment.id)
                                        }
                                    },
                                );
                            }
                        }
                        }
                            key={comment.id} comment={comment}></CommentCard>
                    })
                }
            </ScrollView>
            <InputToolbar
                onSend={(text) => createComment({ variables: { text, answerId: answer.id } })}></InputToolbar>
            <KeyboardSpacer style={{ backgroundColor: "white" }} />

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