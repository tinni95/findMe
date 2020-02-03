import React, { useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Platform, ScrollView, RefreshControl } from "react-native"
import { QuestionCardAfter } from "./components/QuestionCardAfter";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay";
import FindMeSpinner from "../../shared/FindMeSpinner";
import AnswerCard from "./components/AnswerCard";
import HeaderStyles from "../shared/HeaderStyles";
import InputToolbar from "../MessaggiStack/InputToolbar"
import KeyboardSpacer from "react-native-keyboard-spacer";

const answers = gql`
query answersFeed($id:ID!){
    currentUser{
        pictureUrl
    }
    answersFeed(id:$id){
        question{
            id
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
        comments{
            text
            postedBy{
              nome
              cognome
            }
          }
    }
}
`

const CREATEANSWER_MUTATION = gql`
mutation createAnswer($text:String!,$questionId:ID!){
    createAnswer(text:$text, questionId:$questionId){
        id
        postedBy{
            nome
            cognome
        }
    }
}
`

const CREATENOTIFICA_MUTATION = gql`
mutation createNotifica($answerId:ID!,$text:String!,$type:String!, $id:ID!){
    createNotifica(answerId:$answerId, text:$text, type:$type, id:$id){
        id
    }
}
`

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function QuestionScreen({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const hidebar = navigation.getParam("hidebar")
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    const id = navigation.getParam("id");
    const postedBy = navigation.getParam("postedBy");
    const title = navigation.getParam("title");
    const [createNotifica] = useMutation(CREATENOTIFICA_MUTATION)
    const [createAnswer] = useMutation(CREATEANSWER_MUTATION,
        {
            onCompleted: async ({ createAnswer }) => {
                createNotifica({ variables: { type: "questionAnswer", answerId: createAnswer.id, id: postedBy, text: createAnswer.postedBy.nome + " " + createAnswer.postedBy.cognome + " ha risposto al tuo post: " + title } })
                wait(100).then(() => refetch());
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });
    const { loading, error, data, refetch } = useQuery(answers, { variables: { id }, fetchPolicy: "no-cache" });
    const isRefetch = navigation.getParam("refetch") || null
    useEffect(() => {
        isRefetch ? refetch() : null
    }, [isRefetch])

    if (error) {
        return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
    }
    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }

    return <View style={styles.container}>
        {!hidebar &&
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <Ionicons
                        name={"ios-arrow-back"}
                        size={25}
                        style={{ marginLeft: 10 }}
                        color={Colors.blue}
                    ></Ionicons>
                </TouchableOpacity>
            </View>
        }
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <QuestionCardAfter navigation={navigation} id={id}></QuestionCardAfter>
            {
                data.answersFeed.map(answer => {
                    return <AnswerCard key={answer.id} answer={answer} navigation={navigation}></AnswerCard>
                })
            }
        </ScrollView>
        <InputToolbar
            image={{ uri: data.currentUser.pictureUrl }}
            onSend={(text) => {
                text.length > 0 && createAnswer({ variables: { text, questionId: id } })
            }}></InputToolbar>
        <KeyboardSpacer style={{ backgroundColor: "white" }} />
    </View>
}

QuestionScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle,
        headerLeft: (
            <TouchableOpacity onPress={() => { navigation.state.params.onGoBack(); navigation.goBack() }}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4F4',
    },
    headerBar: {
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: "white",
        marginBottom: 1,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 5
            },
        })
    }
})
