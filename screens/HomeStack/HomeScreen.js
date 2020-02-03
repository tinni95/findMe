import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, RefreshControl } from "react-native";
import CreateButton from "../../shared/CreateButton";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import FindMeSpinner from "../../shared/FindMeSpinner";
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay";
import QuestionCard from "./components/QuestionCard";
import SearchHeaderHome from "../../components/SearchHeader/SearchHeaderHome";

var shortid = require("shortid")
const Questions = gql`
{
  questionsFeed{
    id
    question
    title
    createdAt
    postedBy{
      pictureUrl
      id
      nome
      cognome
    }
    likes{
      user{
        id
      }
    }
    answers{
      id
    }
}
}
`
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refetchChild, setRefetch] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefetch(!refetchChild)
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const { loading, data, error, refetch } = useQuery(Questions, { fetchPolicy: "no-cache" })
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
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchHeaderHome></SearchHeaderHome>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {
          data.questionsFeed.map(question => {
            return <QuestionCard isRefetch={refetchChild} key={shortid.generate()} question={question} navigation={navigation}></QuestionCard>
          })
        }
      </ScrollView>
      <View style={styles.penWrapper}>
        <CreateButton onPress={() => navigation.navigate("CreateQuestionScreen")}></CreateButton>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4F4'
  },
  penWrapper: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    zIndex: 100
  },
  searchBarContainer: {
    backgroundColor: "white",
    height: 100,
    marginBottom: 2.5
  }
});
