import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Body } from '../../../components/StyledText';
import moment from 'moment/min/moment-with-locales'
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import FindMeGraphQlErrorDisplay from '../../../shared/FindMeGraphQlErrorDisplay';
import Colors from '../../../constants/Colors';
import SocketContext from "../../../Socket/context"
import { sendNotification } from '../../../shared/PushNotifications';
import LikedBy from './LikedBy';

moment.locale('it');

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


export const QuestionLikesWithLiked = ({ navigation, socket, data, refetch, id }) => {
    const [createNotifica] = useMutation(CREATENOTIFICA_MUTATION)
    const [Like] = useMutation(LIKE_MUTATION,
        {
            onCompleted: async ({ QuestionLike }) => {
                refetch()
                createNotifica({ variables: { questionId: QuestionLike.question.id, type: "questionLike", id: QuestionLike.question.postedBy.id, text: `"` + QuestionLike.question.question + `"` } })
                sendNotification(
                    QuestionLike.question.postedBy.pushToken,
                    "Nuovo Like",
                    "A qualcuno piace il tuo post " + QuestionLike.question.question
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

    return (
        <View >
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
            <LikedBy onPress={() => navigation.navigate("LikedByScreen", { likes: data.singleQuestion.likes })} likes={data.singleQuestion.likes}></LikedBy>
        </View>
    );
};

const QuestionLikesWithLikedWS = props => (
    <SocketContext.Consumer>
        {socket => <QuestionLikesWithLiked {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default QuestionLikesWithLikedWS


const styles = StyleSheet.create({
    counter: {
        fontSize: 12,
        alignSelf: "flex-end",
        zIndex: 100,
        marginBottom: -2,
        marginLeft: 3,
        color: "#707070"
    },
    arrowContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10
    },
});

