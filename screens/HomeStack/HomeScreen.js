import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import Header from "./Header";
import Filters from "./Filters";
var axios = require("axios");

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
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState([])
  const [feeds, setFeeds] = useState([<Text>Hello</Text>])
  if (data) {
    if (data.currentUser) {
      data.currentUser.presentazione == null && !go ?
        setGo(true) :
        null
    }
  }

  useEffect(() => {
    console.log(filters)
  }, [filters])

  useEffect(() => {
    go ? navigation.navigate("UserInfo", { email: data.currentUser.email }) : null
  }, [])

  useEffect(() => {
    axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://www.ilsole24ore.com/rss/mondo--medio-oriente.xml").then((res) => {
      console.log("Hello");
    }, [])
  })

  return (
    <ScrollView style={styles.container}>
      <Header search={search} setSearch={setSearch}></Header>
      <Filters
        filters={filters}
        addFilter={item => setFilters([...filters, item])}
        removeFilter={item => setFilters(filters.filter(i => i !== item))}></Filters>
      {feeds.forEach(feed => { return <Text>hi</Text> })}
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
