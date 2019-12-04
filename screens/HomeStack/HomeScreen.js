import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Header from "./Header";
import Filters from "./Filters";
import FeedCard from "./FeedCard";
var shortid = require("shortid")

export default function LinksScreen({ navigation }) {
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState([])
  const [feeds, setFeeds] = useState([])

  const renderFeeds = () => {
    console.log(feeds)
    return feeds.map(feed => {
      return <View style={styles.feedContainer}>
        <FeedCard key={shortid.generate()} Card={feed}></FeedCard>
      </View>

    })
  }

  return (
    <ScrollView style={styles.container}>
      <Header search={search} setSearch={setSearch}></Header>
      <Filters
        filters={filters}
        addFilter={item => setFilters([...filters, item])}
        removeFilter={item => setFilters(filters.filter(i => i !== item))}></Filters>
      {
        feeds.length > 0 ?
          renderFeeds() : null
      }
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
  },
  feedContainer: {
    backgroundColor: "#E5E5E5",
    alignContent: "center"
  }
});
