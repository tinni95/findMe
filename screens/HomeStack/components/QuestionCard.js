import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { width, isSmallDevice } from '../../../constants/Layout';
import { LinearGradient } from 'expo-linear-gradient';
import { Body } from '../../../components/StyledText';
import moment from 'moment/min/moment-with-locales'
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import FindMeGraphQlErrorDisplay from '../../../shared/FindMeGraphQlErrorDisplay';
import QuestionLikes from './QuestionLikes';

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

export const QuestionCard = ({ question, navigation, isRefetch }) => {
    const image = question.postedBy.pictureUrl ? { uri: question.postedBy.pictureUrl } : require("../../../assets/images/placeholder.png");
    const { loading, data, error, refetch } = useQuery(Likes, { variables: { id: question.id } })

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
                        <Body onPress={() => navigation.navigate("QuestionScreen", { id: question.id, postedBy: question.postedBy.id, title: question.title })} style={styles.title}>{question.title}</Body>
                        <Body style={styles.question}>{question.question}</Body>
                    </View>
                </View>
                <View style={styles.footer}>
                    <QuestionLikes refetch={refetch} data={data} question={question} isRefetch={isRefetch} />
                    <TouchableOpacity onPress={() => navigation.navigate("QuestionScreen", { id: question.id })} style={styles.commentsContainer}>
                        <Image source={require("../../../assets/images/commentbubble.png")} style={{ width: 15, height: 15 }} />
                        <Body style={styles.footerText}>{question.answers.length} risposte</Body>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default QuestionCard


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
        justifyContent: "space-between"
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
    commentsContainer: {
        flex: 5,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 35
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
});

