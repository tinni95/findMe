import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { width, isBigDevice } from '../../../constants/Layout';
import { Body, Light, Bold } from '../../../components/StyledText';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import FindMeGraphQlErrorDisplay from '../../../shared/FindMeGraphQlErrorDisplay';
import FindMeSpinner from '../../../shared/FindMeSpinner';
import Colors from '../../../constants/Colors';
import RoundButtonEmptyIcon from '../../../components/shared/RoundButtonEmptyIcon';
import { AvatarAndTime } from './AvatarAndTime';

const Likes = gql`
query Likes($id:ID!){
    singleQuestion(id:$id){
        id
        question
        postedBy{
            id
            nome
            cognome
        }
        likes{
            id
        }
    }
    UserLikesQuestion(id:$id){
        id
    }
    UserFollowQuestion(id:$id){
        id
    }
    currentUser{
        id
    }
}
`

const FOLLOW_MUTATION = gql`
mutation followMutation($id:ID!){
    FollowQuestion(id:$id){
        id
    }
}
`

const UNFOLLOW_MUTATION = gql`
mutation followMutation($id:ID!){
    deleteFollowQuestion(id:$id){
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
    const [Follow] = useMutation(FOLLOW_MUTATION,
        {
            onCompleted: async ({ QuestionLike }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });
    const [UnFollow] = useMutation(UNFOLLOW_MUTATION,
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
                <AvatarAndTime text={"Pubblicato "} question={data.singleQuestion}></AvatarAndTime>
                <View style={styles.body}>
                    <Body style={styles.question}>{data.singleQuestion.question}</Body>
                    <View style={styles.buttonWrapper}>
                        {data.currentUser.id !== data.singleQuestion.postedBy.id &&
                            <RoundButtonEmptyIcon onPress={() => navigation.navigate("CreateAnswerScreen", { question: data.singleQuestion.question })} textColor={Colors.blue} isMedium color={Colors.blue} text={"Rispondi"} iconName={"ios-send"}
                                iconColor={Colors.blue}></RoundButtonEmptyIcon>
                        }
                    </View>
                </View>
                <View style={styles.footer}>
                    {data.UserLikesQuestion.length > 0 ?
                        <TouchableOpacity onPress={() => UnLike({ variables: { id: data.UserLikesQuestion[0].id } })} style={styles.arrowContainer}>
                            <Image source={require("../../../assets/images/arrow-red.png")} style={{ width: 20, height: 27 }} />
                            <Body style={[styles.counter, { color: Colors.red }]}>{data.singleQuestion.likes.length}</Body>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => Like({ variables: { id: question.id } })} style={styles.arrowContainer}>
                            <Image source={require("../../../assets/images/arrow-white.png")} style={{ width: 20, height: 27 }} />
                            <Body style={styles.counter}>{data.singleQuestion.likes.length}</Body>
                        </TouchableOpacity>
                    }
                    {data.UserFollowQuestion.length > 0 ?
                        <TouchableOpacity onPress={() => UnFollow({ variables: { id: data.UserFollowQuestion[0].id } })} style={styles.bellContainer}>
                            <Image source={require("../../../assets/images/notificationBell-red.png")} style={{ width: 15, height: 16 }} />
                            <Body style={styles.footerText}>Segui Domanda</Body>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => Follow({ variables: { id } })} style={styles.bellContainer}>
                            <Image source={require("../../../assets/images/notificationBell-empty.png")} style={{ width: 15, height: 16 }} />
                            <Body style={styles.footerText}>Segui Domanda</Body>
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
    question: {
        margin: 10,
        marginLeft: 15,
        fontSize: 17,
        marginBottom: 5
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
        marginBottom: 2,
        color: "#707070"
    },
    bellContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
    arrowContainer: {
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    buttonWrapper: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    }
});

