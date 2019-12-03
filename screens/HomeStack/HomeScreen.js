import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import Header from "./Header";
import Filters from "./Filters";
import { All, Mondo, Italia, Lists } from "./Rss";
import FeedCard from "./FeedCard";
var RSSCombiner = require('rss-combiner');
var parseString = require('xml2js').parseString;
var shortid = require("shortid")
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
  const [feeds, setFeeds] = useState([])
  if (data) {
    if (data.currentUser) {
      data.currentUser.presentazione == null && !go ?
        setGo(true) :
        null
    }
  }

  const renderFeeds = () => {
    console.log(feeds)
    return feeds.map(feed => {
      return <View style={styles.feedContainer}>
        <FeedCard key={shortid.generate()} Card={feed}></FeedCard>
      </View>

    })
  }

  const rss = async (feedLinks) => {
    var feedConfig = {
      size: 20,
      feeds: feedLinks,
      pubDate: new Date()
    };
    RSSCombiner(feedConfig)
      .then(function (combinedFeed) {
        var xml = combinedFeed.xml();
        parseString(xml, function (err, result) {
          setFeeds(result.rss.channel[0].item)
        });
      });
  }

  useEffect(() => {
    let lists = []
    lists = filters.map(filter => {
      return Lists[filter]
    })
    var merged = [].concat.apply([], lists);
    rss(merged);
  }, [filters])

  useEffect(() => {
    go ? navigation.navigate("UserInfo", { email: data.currentUser.email }) : null
  }, [])

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
