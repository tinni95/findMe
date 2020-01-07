import React, { useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Platform, ScrollView } from "react-native"
import { QuestionCardAfter } from "./components/QuestionCardAfter";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay";
import FindMeSpinner from "../../shared/FindMeSpinner";
import AnswerCard from "./components/AnswerCard";

const answers = gql`
query answersFeed($id:ID!){
    answersFeed(id:$id){
        id
        text
        createdAt
        postedBy{
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

export default function QuestionScreen({ navigation }) {
    const question = navigation.getParam("question");
    const { loading, error, data, refetch } = useQuery(answers, { variables: { id: question.id } });
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
        <QuestionCardAfter navigation={navigation} question={question}></QuestionCardAfter>
        <ScrollView>
            {
                data.answersFeed.map(answer => {
                    return <AnswerCard key={answer.id} answer={answer} question={question}></AnswerCard>
                })
            }
        </ScrollView>
    </View>
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
                elevation: 20
            },
        })
    }
})
