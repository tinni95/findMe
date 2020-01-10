import React, { useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Platform, ScrollView, RefreshControl } from "react-native"
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
        question{
            id
        }
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
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function QuestionScreen({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const id = navigation.getParam("id");
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
                elevation: 5
            },
        })
    }
})
