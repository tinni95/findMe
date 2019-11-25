import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Platform, RefreshControl } from 'react-native';
import PostCard from '../../components/PostCard';
import { Bold } from "../../components/StyledText";
import SearchHeader from '../../components/SearchHeader';
import FiltersPage from './FiltersStack/FiltersPage';
import { isBigDevice } from '../../constants/Layout';

export default function Explore({ posts, settore, navigation, refetch }) {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    await refetch()
  }

  const renderPosts = () => {
    return posts.map((post, index) => {
      return (
        <PostCard
          navigation={navigation}
          key={index}
          bg="#00B6BE"
          color="white"
          post={post}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <SearchHeader
        settore={settore}
        search={search}
        navigation={navigation}
        setSearch={search => {
          setSearch(search)
        }}
      />
      <View style={styles.postBody}>
        {isBigDevice ?
          <View style={styles.subContainer}>
            <View style={{ flex: 1 }}>
              <FiltersPage settore={settore} navigation={navigation} />
            </View>
            <View style={{ flex: 4 }}>
              <Bold style={styles.resultText}>{posts.length} risultati</Bold>
              <ScrollView>{renderPosts()}</ScrollView>
            </View>
          </View>
          :
          <View style={{ flex: 1 }}>
            <Bold style={styles.resultText}>{posts.length} risultati</Bold>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>{renderPosts()}</ScrollView>
          </View>
        }
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  postBody: {
    flex: 5
  },
  resultText: {
    textAlign: "center",
    fontSize: Platform.OS == "web" ? 25 : 20,
    margin: Platform.OS == "web" ? 20 : 10
  },
  subContainer: {
    flex: 1,
    flexDirection: "row"
  }
});

Explore.navigationOptions = {
  header: null
};

