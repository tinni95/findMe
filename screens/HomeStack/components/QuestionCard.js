import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { width, isBigDevice, isSmallDevice } from '../../../constants/Layout';
import { LinearGradient } from 'expo-linear-gradient';
import { Body, Light } from '../../../components/StyledText';
import moment from 'moment/min/moment-with-locales'
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import FindMeGraphQlErrorDisplay from '../../../shared/FindMeGraphQlErrorDisplay';
import Colors from '../../../constants/Colors';
import SocketContext from "../../../Socket/context"
import { sendNotification } from '../../../shared/PushNotifications';

moment.locale('it');

const Likes = gql`
query Likes($id:ID!){
    QuestionLikes(id:$id){
        id
    }
    UserLikesQuestion(id:$id){
        id
    }
}
`
const LIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    QuestionLike(id:$id){
        id
        question{
            question
            id
            postedBy{
              id
              pushToken
            }
          }
    }
}
`
const UNLIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    deleteQuestionLike(id:$id){
        id
    }
}
`

const CREATENOTIFICA_MUTATION = gql`
mutation createNotifica($questionId:ID!,$text:String!,$type:String!, $id:ID!){
    createNotifica(questionId:$questionId, text:$text, type:$type, id:$id){
        id
    }
}
`


export const QuestionCard = ({ question, navigation, isRefetch, socket }) => {
    const image = question.postedBy.pictureUrl ? { uri: question.postedBy.pictureUrl } : require("../../../assets/images/placeholder.png");
    const { loading, data, error, refetch } = useQuery(Likes, { variables: { id: question.id } })
    const [createNotifica] = useMutation(CREATENOTIFICA_MUTATION)
    const [Like] = useMutation(LIKE_MUTATION,
        {
            onCompleted: async ({ QuestionLike }) => {
                refetch()
                createNotifica({ variables: { questionId: QuestionLike.question.id, type: "questionLike", id: QuestionLike.question.postedBy.id, text: `"` + QuestionLike.question.question + `"` } })
                sendNotification(
                    QuestionLike.question.postedBy.pushToken,
                    "Nuovo Like",
                    "A qualcuno piace la tua domanda " + QuestionLike.question.question
                )
                socket.emit("notifica", QuestionLike.question.postedBy.id);
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });
    const [UnLike] = useMutation(UNLIKE_MUTATION,
        {
            onCompleted: async ({ deleteQuestionLike }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    useEffect(() => {
        refetch()
    }, [isRefetch])

    if (error) {
        return <FindMeGraphQlErrorDisplay />
    }
    if (loading) {
        return <Image source={require("../../../assets/images/shimmer.gif")}></Image>
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <View style={styles.body}>
                    <TouchableOpacity onPress={() => navigation.navigate("UserVisitsProfileScreen", { id: question.postedBy.id })} style={styles.imageContainer}>
                        <Image source={image} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    </TouchableOpacity>
                    <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
                    <View style={styles.content}>
                        <Body onPress={() => navigation.navigate("UserVisitsProfileScreen", { id: question.postedBy.id })} style={styles.person}>{question.postedBy.nome + " " + question.postedBy.cognome}</Body>
                        <Body style={styles.date}>{"Pubblicato " + moment(question.createdAt).fromNow()}</Body>
                        <Body onPress={() => navigation.navigate("QuestionScreen", { id: question.id })} style={styles.title}>{question.title}</Body>
                        <Body style={styles.question}>{question.question}</Body>
                    </View>
                </View>
                <View style={styles.footer}>
                    {data.UserLikesQuestion.length > 0 ?
                        <TouchableOpacity onPress={() => UnLike({ variables: { id: data.UserLikesQuestion[0].id } })} style={styles.arrowContainer}>
                            <Image source={require("../../../assets/images/like_full.png")} style={{ width: 17, height: 25 }} />
                            <Body style={[styles.counter, { color: Colors.blue }]}>{data.QuestionLikes.length}</Body>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => Like({ variables: { id: question.id } })} style={styles.arrowContainer}>
                            <Image source={require("../../../assets/images/like_empty.png")} style={{ width: 17, height: 25 }} />
                            <Body style={styles.counter}>{data.QuestionLikes.length}</Body>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => navigation.navigate("QuestionScreen", { id: question.id })} style={styles.commentsContainer}>
                        <Image source={require("../../../assets/images/commentbubble.png")} style={{ width: 15, height: 15 }} />
                        <Body style={styles.footerText}>{question.answers.length} risposte</Body>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const QuestionCardWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <QuestionCard {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default QuestionCardWithSocket


const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
    },
    card: {
        alignSelf: 'baseline',
        marginBottom: 5,
        paddingBottom: 5,
        width: "100%",
        backgroundColor: 'white',
    },
    body: {
        flex: 7,
        flexDirection: 'row'
    },
    footer: {
        marginTop: 10,
        flex: 2,
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    line: {
        width: 4
    },
    imageContainer: {
        margin: 10,
        marginTop: 5
    },
    person: {
        margin: 10,
        fontSize: isSmallDevice ? 12 : 13,
        marginTop: 5,
        marginBottom: 5
    },
    title: {
        margin: 10,
        fontSize: isSmallDevice ? 15 : 16,
        marginTop: 10,
        marginBottom: 5,
        width: width - 80
    },
    question: {
        margin: 10,
        marginRight: 20,
        fontSize: isSmallDevice ? 10 : 11,
        marginTop: 5,
        color: "#707070"
    },
    content: {
        flexDirection: "column"
    },
    date: {
        marginLeft: 10,
        fontSize: isSmallDevice ? 9 : 10,
        color: "#707070"
    },
    arrowContainer: {
        flex: 4,
        alignContent: "center",
        flexDirection: "row",
        margin: 10,
        marginLeft: 15,
        justifyContent: "flex-start",
        marginBottom: 10
    },
    commentsContainer: {
        flex: 5,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    bellContainer: {
        flex: 5,
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
        fontSize: 12,
        alignSelf: "flex-end",
        zIndex: 100,
        marginBottom: -2,
        marginLeft: 2,
        color: "#707070"
    }
});

