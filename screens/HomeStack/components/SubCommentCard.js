import React from "react"
import { View, Platform, StyleSheet, Image, TouchableOpacity } from "react-native"
import moment from 'moment/min/moment-with-locales'
import { width, isSmallDevice } from "../../../constants/Layout";
import { Body, Light } from "../../../components/StyledText";
import FindMeSpinner from "../../../shared/FindMeSpinner";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";
import Colors from "../../../constants/Colors";
moment.locale('it');

const Likes = gql`
query Likes($id:ID!){
    UserLikesComment(id:$id){
        id
    }
    CommentLikes(id:$id){
        id
    }
}
`

const LIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    CommentLike(id:$id){
        id
    }
}
`
const UNLIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    deleteCommentLike(id:$id){
        id
    }
}
`

export default function SubCommentCard({ onReply, comment, onLongPress }) {
    const { loading, error, refetch, data } = useQuery(Likes, { variables: { id: comment.id } })
    const [Like] = useMutation(LIKE_MUTATION,
        {
            onCompleted: async ({ AnswerLike }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });
    const [UnLike] = useMutation(UNLIKE_MUTATION,
        {
            onCompleted: async ({ AnswerLike }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    const image = comment.postedBy.pictureUrl ? { uri: comment.postedBy.pictureUrl } : require("../../../assets/images/placeholder.png")

    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={image} style={{ width: 20, height: 20, borderRadius: 10 }} />
            </View>
            <TouchableOpacity onLongPress={onLongPress} style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Body style={styles.nome}>{comment.postedBy.nome + " " + comment.postedBy.cognome}</Body>
                        <Light style={styles.occupazione}>App developer</Light>
                    </View>
                    <View style={styles.body}>
                        <Light style={styles.date}>{moment(comment.createdAt).fromNow()}</Light>
                    </View>
                </View>
                <Light style={styles.comment}>{comment.text}</Light>
                <View style={styles.footer}>
                    <View style={styles.arrowsContainer}>
                        {data.UserLikesComment.length > 0 ?
                            <TouchableOpacity style={styles.arrowContainer} onPress={() =>
                                UnLike({ variables: { id: data.UserLikesComment[0].id } })}>
                                <Image source={require("../../../assets/images/like_full.png")} style={{ width: 10, height: 16 }} />
                                <Body style={[styles.counter, { color: Colors.blue }]}>{data.CommentLikes.length}</Body>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.arrowContainer} onPress={() => Like({
                                variables: { id: comment.id }
                            })}>
                                <Image source={require("../../../assets/images/like_empty.png")} style={{ width: 10, height: 16 }} />
                                <Body style={[styles.counter]}>{data.CommentLikes.length}</Body>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.spacer}></View>
                    <TouchableOpacity onPress={onReply} style={styles.commentsContainer}>
                        <Image source={require("../../../assets/images/commentbubble.png")} style={{ width: 12, height: 12 }} />
                        <Body style={styles.footerText}>Rispondi</Body>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 50,
    },
    imageContainer: {
        margin: 15,
        marginTop: 0
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    comment: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 3
    },
    title: {
        flexDirection: "column"
    },
    nome: {
        fontSize: 11
    },
    occupazione: {
        fontSize: 10
    },
    date: {
        fontSize: 9
    },
    body: {
        marginLeft: 3,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flex: 1
    },
    card: {
        padding: 5,
        width: width - 140,
        borderRadius: 2.5,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 5
            }
        })
    },
    content: {
        justifyContent: "flex-start",
        marginLeft: 15
    },
    footer: {
        flexDirection: "row",
        flex: 1,
        marginTop: 10
    },
    arrowContainer: {
        alignContent: "center",
        flexDirection: "row",
        marginLeft: 15,
        justifyContent: "flex-start",
        marginBottom: 10
    },
    arrowsContainer: {
        flexDirection: "row",
        flex: 2,
        alignContent: "center",
        justifyContent: "space-between"
    },
    spacer: {
        flex: 2
    },
    commentsContainer: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    footerText: {
        fontSize: isSmallDevice ? 9 : 10,
        color: "#707070",
        marginLeft: 8
    },
    counter: {
        fontSize: isSmallDevice ? 9 : 10,
        alignSelf: "flex-end",
        zIndex: 100,
        marginBottom: -2,
        marginLeft: 2,
        color: "#707070"
    }
})