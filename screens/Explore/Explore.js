import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Platform, RefreshControl } from 'react-native';
import PostCard from '../../components/PostCard';
import { Bold } from "../../components/StyledText";
import SearchHeader from '../../components/SearchHeader';
import FiltersPage from './FiltersStack/FiltersPage';
import { isBigDevice } from '../../constants/Layout';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"
import CreateButton from '../../shared/CreateButton';

const posts = gql`
  query posts($filter:String,$settore:[String!],$regione:String){
  postsFeed(filter:$filter, settore: $settore,regione:$regione) {
    id
    title
    description
    fields
    comune
    hidden
    postedBy{
      pictureUrl
      nome
      DoB
      cognome
    }
    regione
    provincia
    positions{
    id
    title
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
  const isRefetch = navigation.getParam("refetch") || null
  const provincia = navigation.getParam("provincia") || null
  let settore = navigation.getParam("settore") || null
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setSearch] = useState("");
  const { loading, error, data, refetch } = useQuery(posts, {
    variables: settore && settore.length > 0 ? { settore, regione, comune, provincia, filter } : { regione, comune, provincia, filter }
  });
  const countFilters = () => {
    let i = 0;
    if (regione != null) {
      i = i + 1
    }
    if (provincia != null) {
      i = i + 1
    }
    if (comune != null) {
      i = i + 1
    }
    if (settore != null) {
      i = i + settore.length
    }
    return i
  }

  const filters = countFilters();


  useEffect(() => {
    isRefetch ? refetch() : null
  }, [isRefetch])


  if (loading) return (
    <View style={styles.container}>
      <SearchHeader
        filters={filters}
        settore={settore}
        navigation={navigation}
        setSearch={search => {
          setSearch(search)
        }
        }
      />
      <View style={styles.postBody}>
        <Image source={require("../../assets/images/shimmer.gif")}></Image>
      </View>
    </View>
  );
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
            onPress={() => navigation.navigate('PostScreen', {
              id: post.id,
              onGoBack: () => refetch()
            })}
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
          filters={filters}
          settore={settore}
          navigation={navigation}
          setSearch={search => {
            setSearch(search)
          }
          }
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
              <View style={styles.penWrapper}>
                <CreateButton onPress={() => navigation.navigate("InsertStack")}></CreateButton>
              </View>
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
    backgroundColor: '#F7F4F4'
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
  },
  penWrapper: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    zIndex: 100
  }
});

Explore.navigationOptions = {
  header: null
};

