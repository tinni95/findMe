import React, { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Keyboard, RefreshControl } from "react-native"
import { gql } from "apollo-boost"
import { useMutation, useQuery } from "react-apollo"
import HeaderBarComments from "./components/HeaderBarComments"
import { width, isSmallDevice } from "../../constants/Layout"
import AnswerCardAfter from "./components/AnswerCardAfter"
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay"
import CommentCard from "./components/CommentCard"
import { useActionSheet } from '@expo/react-native-action-sheet'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useRef } from "react"
import InputToolbarComment from "../MessaggiStack/InputToolBarComment"
import SubCommentCard from "./components/SubCommentCard"

const DELETECOMMENT_MUTATION = gql`
mutation deleteComment($id:ID!){
    deleteComment(id:$id){
        id
    }
}
`

const DELETESUBCOMMENT_MUTATION = gql`
mutation deleteSubComment($id:ID!){
    deleteSubComment(id:$id){
        id
    }
}
`

const comments = gql`
query comments($id:ID!){
    commentsFeed(id:$id){
        subComments{
            id
            text
            createdAt
            postedBy{
                pictureUrl
                id
              nome
              cognome
            }
            likes{
                id
            }
        }
        id
        text
        createdAt
        postedBy{
            pictureUrl
            id
          nome
          cognome
        }
        id
        likes{
            id
        }
    }
    currentUser{
        pictureUrl
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
    const input = useRef()
    const [subComment, setSubComment] = React.useState("")
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const { showActionSheetWithOptions } = useActionSheet();
    const options = ['Delete', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    const answer = navigation.getParam("answer")
    const [commentId, setId] = useState("")
    const [subCommentId, setSubId] = useState("")
    const { loading, data, error, refetch } = useQuery(comments, { variables: { id: answer.id }, fetchPolicy: "no-cache" })

    const order = array => {
        return array.sort(function (a, b) {
            a = new Date(a.createdAt);
            b = new Date(b.createdAt);
            return a > b ? -1 : a < b ? 1 : 0;
        });
    }

    const [deleteComment] = useMutation(DELETECOMMENT_MUTATION,
        {
            onCompleted: async ({ createAnswer }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    const [deleteSubComment] = useMutation(DELETESUBCOMMENT_MUTATION,
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

    useEffect(() => {
        subCommentId != "" && deleteSubComment({ variables: { id: subCommentId } })
    }, [subCommentId])

    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }
    if (error) {
        console.log(error)
        return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
    }
    return (
        <View style={styles.container}>
            <HeaderBarComments text={"Commenta"} id={answer.question.id} navigation={navigation} />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <AnswerCardAfter answer={answer}></AnswerCardAfter>
                {
                    data.commentsFeed.map(comment => {
                        return <View key={comment.id}><CommentCard onReply={() => {
                            input.current.focus()
                            setSubComment(comment)
                        }}
                            onLongPress={() => {
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
                            comment={comment}></CommentCard>
                            {order(comment.subComments).map(subComment => {
                                return <SubCommentCard
                                    onLongPress={() => {
                                        if (data.currentUser.id == subComment.postedBy.id) {
                                            showActionSheetWithOptions(
                                                {
                                                    options,
                                                    cancelButtonIndex,
                                                    destructiveButtonIndex,
                                                },
                                                buttonIndex => {
                                                    if (buttonIndex == 0) {
                                                        setSubId(subComment.id)
                                                        console.log(subComment.id)
                                                    }
                                                },
                                            );
                                        }
                                    }
                                    }
                                    onReply={() => {
                                        input.current.focus()
                                        setSubComment(comment)
                                    }}
                                    comment={subComment}
                                    key={subComment.id}
                                ></SubCommentCard>
                            })}
                        </View>
                    })
                }
            </ScrollView>
            <InputToolbarComment
                answerId={answer.id}
                refetch={refetch}
                refer={input}
                comment={subComment}
                viewStyle={{ paddingBottom: 10 }}
                image={{ uri: data.currentUser.pictureUrl }}></InputToolbarComment>
            <KeyboardSpacer style={{ backgroundColor: "white" }} topSpacing={isSmallDevice ? -40 : -80} />

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