import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

const User = gql`
{
  currentUser{
    presentazione
    email
  }
}`

export default function LinksScreen({ navigation }) {
  const { data } = useQuery(User)
  const [go, setGo] = useState(null)
  if (data) {
    if (data.currentUser) {
      data.currentUser.presentazione == null && !go ?
        setGo(true) :
        null
    }
  }

  useEffect(() => {
    go ? navigation.navigate("UserInfo", { email: data.currentUser.email }) : null
  })

  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <ExpoLinksView />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: "Links"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
