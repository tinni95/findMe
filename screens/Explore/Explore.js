import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Platform, RefreshControl } from 'react-native';
import PostCard from '../../components/PostCard';
import { Bold } from "../../components/StyledText";
import SearchHeader from '../../components/SearchHeader';
import FiltersPage from './FiltersStack/FiltersPage';
import { isBigDevice } from '../../constants/Layout';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"

const posts = gql`
  query posts($filter:String,$settore:[String!],$regione:String){
  postsFeed(filter:$filter, settore: $settore,regione:$regione) {
    id
    title
    description
    fields
    comune
    regione
    provincia
    positions{
    id
    description
    requisiti
    field
    }
  }
}

`;

export default function Explore({ navigation }) {
  const regione = navigation.getParam("regione") || null
  const comune = navigation.getParam("comune") || null
  const provincia = navigation.getParam("provincia") || null
  let settore = navigation.getParam("settore") || null
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(posts, {
    variables: settore && settore.length > 0 ? { settore, regione, comune, provincia, filter: search } : { regione, comune, provincia, filter: search }
  });

  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />
  if (data) {
    const onRefresh = async () => {
      setRefreshing(true)
      refetch().then(() => setRefreshing(false))
    }

    const renderPosts = () => {
      return data.postsFeed.map((post, index) => {
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
                <ScrollView>
                  {renderPosts()}
                </ScrollView>
              </View>
            </View>
            :
            <View style={{
              flex: 1
            }}>
              <ScrollView style={{ zIndex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {renderPosts()}</ScrollView>
            </View>
          }
        </View>
      </View>
    );

  }

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
    fontSize: Platform.OS == "web" ? 22 : 15,
    margin: Platform.OS == "web" ? 20 : 7,

  },
  subContainer: {
    flex: 1,
    flexDirection: "row"
  }
});

Explore.navigationOptions = {
  header: null
};

