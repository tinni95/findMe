import React from "react"
import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { AvatarAndTime } from "./AvatarAndTime";
import { width, isSmallDevice } from "../../../constants/Layout";
import { Light, Body } from "../../../components/StyledText";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";
import FindMeSpinner from "../../../shared/FindMeSpinner";
import FindMeGraphQlErrorDisplay from "../../../shared/FindMeGraphQlErrorDisplay";
import Colors from "../../../constants/Colors"

const Likes = gql`
query Likes($id:ID!){
    AnswerLikes(id:$id){
        id
    }
    UserLikesAnswer(id:$id){
        id
    }
}
`

const LIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    AnswerLike(id:$id){
        id
    }
}
`
const UNLIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    deleteAnswerLike(id:$id){
        id
    }
}
`

export default function AnswerCard({ answer, navigation }) {
    const { loading, error, refetch, data } = useQuery(Likes, { variables: { id: answer.id } })
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

    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }
    if (error) {
        return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("UserVisitsProfileScreen", { id: answer.postedBy.id })}>
                <AvatarAndTime text={"Ha risposto "} question={answer}></AvatarAndTime>
            </TouchableOpacity>
            <View style={styles.content}>
                <Light>{answer.text}</Light>
            </View>
            <View style={styles.footer}>
                <View style={styles.arrowsContainer}>
                    {data.UserLikesAnswer.length > 0 ?
                        <TouchableOpacity style={styles.arrowContainer} onPress={() =>
                            UnLike({ variables: { id: data.UserLikesAnswer[0].id } })}>
                            <Image source={require("../../../assets/images/like_full.png")} style={{ width: 14, height: 21 }} />
                            <Body style={[styles.counter, { color: Colors.blue }]}>{data.AnswerLikes.length}</Body>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.arrowContainer} onPress={() => Like({
                            variables: { id: answer.id }
                        })}>
                            <Image source={require("../../../assets/images/like_empty.png")} style={{ width: 14, height: 21 }} />
                            <Body style={[styles.counter]}>{data.AnswerLikes.length}</Body>
                        </TouchableOpacity>
                    }

                </View>
                <View style={styles.spacer}></View>
                <TouchableOpacity onPress={() => navigation.navigate("CreateCommentScreen", { answer })} style={styles.commentsContainer}>
                    <Image source={require("../../../assets/images/commentbubble.png")} style={{ width: 15, height: 15 }} />
                    <Body style={styles.footerText}>{answer.comments.length} commenti</Body>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignSelf: 'baseline',
        backgroundColor: "white",
        marginBottom: 5,
        paddingBottom: 5,
        width: width
    },
    content: {
        justifyContent: "flex-start",
        marginLeft: 15
    },
    footer: {
        flexDirection: "row",
        flex: 1,
    },
    arrowContainer: {
        alignContent: "center",
        flexDirection: "row",
        margin: 10,
        marginLeft: 15,
        justifyContent: "flex-start",
        marginBottom: 10
    },
    arrowsContainer: {
        marginTop: 10,
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
        marginTop: 15,
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