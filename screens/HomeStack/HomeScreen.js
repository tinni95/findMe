import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import CreateButton from "../../shared/CreateButton";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import FindMeSpinner from "../../shared/FindMeSpinner";
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay";
import { Body } from "../../components/StyledText";
import { QuestionCard } from "./components/QuestionCard";
var shortid = require("shortid")
const Questions = gql`
{
  questionsFeed{
    id
    question
    tags
    createdAt
    postedBy{
      nome
      cognome
    }
    likes{
      user{
        id
      }
    }
    answers{
      text
      postedBy{
        nome
        cognome
      }
      text
      createdAt
    }
}
}
`

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("")
  const { loading, data, error } = useQuery(Questions)
  if (error) {
    return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
  }
  if (loading) {
    return <FindMeSpinner></FindMeSpinner>
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
      </View>
      <ScrollView>
        {
          data.questionsFeed.map(question => {
            return <QuestionCard key={shortid.generate()} question={question} navigation={navigation}></QuestionCard>
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
    height: 65,
    marginBottom: 2.5
  }
});
