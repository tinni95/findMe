import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { width, isBigDevice, isSmallDevice } from '../../../constants/Layout';
import { LinearGradient } from 'expo-linear-gradient';
import { Body, Light, Bold } from '../../../components/StyledText';
import moment from 'moment/min/moment-with-locales'
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import FindMeGraphQlErrorDisplay from '../../../shared/FindMeGraphQlErrorDisplay';
import FindMeSpinner from '../../../shared/FindMeSpinner';
import Colors from '../../../constants/Colors';

moment.locale('it');
const Likes = gql`
query Likes($id:ID!){
    AnswerLikes(id:$id){
        id
    }
    AnswerDisLikes(id:$id){
        id
    }
    UserLikesAnswer(id:$id){
        id
    }
    UserDisLikesAnswer(id:$id){
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
const DISLIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    AnswerDisLike(id:$id){
        id
    }
}
`
const UNDISLIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    deleteAnswerDisLike(id:$id){
        id
    }
}
`
export default AnswerCard = ({ answer, navigation, isRefetch }) => {

    useEffect(() => {
        refetch()
    }, [isRefetch])

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
    const [DisLike] = useMutation(DISLIKE_MUTATION,
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

    const [UnDisLike] = useMutation(UNDISLIKE_MUTATION,
        {
            onCompleted: async ({ AnswerLike }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });

    if (error) {
        return <FindMeGraphQlErrorDisplay />
    }
    if (loading) {
        return <FindMeSpinner />
    }

    const like = () => {
        if (data.UserDisLikesAnswer.length > 0) {
            UnDisLike({ variables: { id: data.UserDisLikesAnswer[0].id } }).then(() => {
                Like({ variables: { id: answer.id } })
            })
        }
        else {
            Like({ variables: { id: answer.id } })
        }
    }

    const unLike = () => {
        UnLike({ variables: { id: data.UserLikesAnswer[0].id } })
    }

    const disLike = () => {
        if (data.UserLikesAnswer.length > 0) {
            UnLike({ variables: { id: data.UserLikesAnswer[0].id } }).then(() => {
                DisLike({ variables: { id: answer.id } })
            })
        }
        else {
            DisLike({ variables: { id: answer.id } })
        }
    }

    const unDisLike = () => {
        UnDisLike({ variables: { id: data.UserDisLikesAnswer[0].id } })
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <View style={styles.body}>
                    <View style={styles.imageContainer}>
                        <Image source={require("../../../assets/images/placeholder.png")} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    </View>
                    <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
                    <View style={styles.content}>
                        <Body style={styles.person}>{answer.question.postedBy.nome + " " + answer.question.postedBy.cognome}</Body>
                        <Body style={styles.date}>{"Pubblicato " + moment(answer.question.createdAt).fromNow()}</Body>
                        <Body style={styles.question}>{answer.question.question}</Body>
                    </View>
                </View>
                <View style={styles.answerWrapper}>
                    <Body style={styles.answerHeader}>Risposta</Body>
                    <Light style={styles.answerText}>{answer.text}</Light>
                </View>
                <View style={styles.footer}>
                    <View style={styles.arrowsContainer}>
                        {data.UserLikesAnswer.length > 0 ?
                            <TouchableOpacity style={styles.arrowContainer} onPress={() => unLike()}>
                                <Image source={require("../../../assets/images/arrow-red.png")} style={{ width: 12, height: 16 }} />
                                <Body style={[styles.counter, { color: Colors.red }]}>{data.AnswerLikes.length}</Body>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.arrowContainer} onPress={() => like()}>
                                <Image source={require("../../../assets/images/arrow-white.png")} style={{ width: 12, height: 16 }} />
                                <Body style={[styles.counter]}>{data.AnswerLikes.length}</Body>
                            </TouchableOpacity>
                        }
                        {data.UserDisLikesAnswer.length > 0 ?
                            <TouchableOpacity style={styles.arrowContainer} onPress={() => unDisLike()}>
                                <Image source={require("../../../assets/images/arrow-down-red.png")} style={{ width: 12, height: 16 }} />
                                <Body style={[styles.counter, { color: Colors.red }]}>{data.AnswerDisLikes.length}</Body>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.arrowContainer} onPress={() => disLike()}>
                                <Image source={require("../../../assets/images/arrow-down.png")} style={{ width: 12, height: 16 }} />
                                <Body style={[styles.counter]}>{data.AnswerDisLikes.length}</Body>
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
        </View>
    );
};

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
    question: {
        margin: 10,
        fontSize: isSmallDevice ? 14 : 15,
        marginTop: 5,
        marginBottom: 5,
        width: width - 80
    },
    tags: {
        margin: 10,
        fontSize: isSmallDevice ? 10 : 11,
        marginTop: 5,
        color: "#707070"
    },
    content: {
        flexDirection: "column",
        paddingBottom: 15
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
    },
    answerWrapper: {
        margin: 10
    },
    answerHeader: {
        fontSize: 11,
        color: "#818181"
    },
    answerText: {
        fontSize: 17,
        marginTop: 10,
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

});

