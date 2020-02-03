import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { width } from '../../../constants/Layout';
import { Body } from '../../../components/StyledText';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import FindMeGraphQlErrorDisplay from '../../../shared/FindMeGraphQlErrorDisplay';
import FindMeSpinner from '../../../shared/FindMeSpinner';
import Colors from '../../../constants/Colors';
import RoundButtonEmptyIcon from '../../../components/shared/RoundButtonEmptyIcon';
import AvatarAndTimeQuestion from './AvatarAndTimeQuestion';

const Likes = gql`
query Likes($id:ID!){
    singleQuestion(id:$id){
        id
        question
        title
        postedBy{
            id
            nome
            cognome
            pictureUrl
        }
        likes{
            id
        }
    }
    UserLikesQuestion(id:$id){
        id
    }
    currentUser{
        id
    }
}
`
const LIKE_MUTATION = gql`
mutation likeMutation($id:ID!){
    QuestionLike(id:$id){
        id
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
export const QuestionCardAfter = ({ id, navigation }) => {
    const { loading, data, error, refetch } = useQuery(Likes, { variables: { id }, fetchPolicy: "no-cache" })
    const [Like] = useMutation(LIKE_MUTATION,
        {
            onCompleted: async ({ QuestionLike }) => {
                refetch()
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

    if (error) {
        return <FindMeGraphQlErrorDisplay />
    }
    if (loading) {
        return <FindMeSpinner />
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <TouchableOpacity onPress={() => navigation.navigate("UserVisitsProfileScreen", { id: data.singleQuestion.postedBy.id })}>
                    <AvatarAndTimeQuestion text={"Pubblicato "} question={data.singleQuestion}></AvatarAndTimeQuestion>
                </TouchableOpacity>
                <View style={styles.body}>
                    <Body style={styles.title}>{data.singleQuestion.title}</Body>
                    <Body style={styles.question}>{data.singleQuestion.question}</Body>
                </View>
                <View style={styles.footer}>
                    {data.UserLikesQuestion.length > 0 ?
                        <TouchableOpacity onPress={() => UnLike({ variables: { id: data.UserLikesQuestion[0].id } })} style={styles.arrowContainer}>
                            <Image source={require("../../../assets/images/like_full.png")} style={{ width: 17, height: 25 }} />
                            <Body style={[styles.counter, { color: Colors.blue }]}>{data.singleQuestion.likes.length}</Body>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => Like({ variables: { id } })} style={styles.arrowContainer}>
                            <Image source={require("../../../assets/images/like_empty.png")} style={{ width: 17, height: 25 }} />
                            <Body style={styles.counter}>{data.singleQuestion.likes.length}</Body>
                        </TouchableOpacity>
                    }

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
        backgroundColor: "white",
        marginBottom: 5,
        paddingBottom: 5,
        width: width
    },
    body: {
        justifyContent: "flex-start",
    },
    footer: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    title: {
        margin: 10,
        marginLeft: 15,
        fontSize: 20,
        marginBottom: 5
    },
    question: {
        margin: 10,
        marginLeft: 15,
        fontSize: 15,
        color: "#707070",
    },
    footerText: {
        fontSize: 9,
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
    arrowContainer: {
        marginTop: 10,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center"
    },
});

