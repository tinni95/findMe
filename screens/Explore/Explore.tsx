import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  RefreshControl
} from "react-native";
import PostCard from "../../shared/components/PostCard";
import SearchHeader from "../../shared/components/SearchHeader";
import FiltersPage from "./FiltersStack";
import { isBigDevice } from "../../shared/constants/Layout";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TenditGraphqlErrorDisplay from "../../shared/graphql/TenditErrorDisplay";
const posts = gql`
  query posts($filter: String, $settore: [String!], $regione: String, $provincia:String, $comune:String) {
    postsFeed(filter: $filter, settore: $settore, regione: $regione, provincia: $provincia, comune: $comune) {
      id
      titolo
      descrizione
      categoria
      comune
      regione
      provincia
      hidden
      postedBy {
        id
        pictureUrl
        nome
        DoB
        cognome
      }
      budget
      startTime
      endTime
      data
      quando
      titolo
      opened
      descrizione
      requisiti
    }
  }
`;

export default function Explore({ navigation }) {
  const regione = navigation.getParam("regione",null)
  const comune = navigation.getParam("comune",null)
  const isRefetch = navigation.getParam("isRefetch",null) 
  const provincia = navigation.getParam("provincia",null) 
  const settore = navigation.getParam("settore",null) 
  const [filter, setSearch] = useState("");
  const filters = { regione, comune, provincia, filter }
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(posts, {
    variables:
      settore && settore.length > 0
        ? { settore, ...filters }
        : filters
  });

  useEffect(() => {
    isRefetch ? refetch() : null;
  }, [isRefetch]);

  if (loading)
    return (
      <View style={styles.container}>
        <SearchHeader
          provincia={provincia}
          regione={regione}
          comune={comune}
          settore={settore}
          navigation={navigation}
          setSearch={search => {
            setSearch(search);
          }}
        />
        <View style={styles.postBody}>
          <Image source={require("../../assets/images/shimmer.gif")}></Image>
        </View>
      </View>
    );
  if (error) return <TenditGraphqlErrorDisplay />;
  if (data) {
    const onRefresh = async () => {
      setRefreshing(true);
      refetch().then(() => setRefreshing(false));
    };

    const renderPosts = () => {
      return data.postsFeed.map((post, index) => {
        if(post.opened)
        return (
          <PostCard
          navigation={navigation}
            onPress={() =>
              navigation.navigate("PostScreen", {
                id: post.id,
                onGoBack: () => refetch()
              })
            }
            key={index}
            post={post}
          />
        );
      });
    };
    return (
      <View style={styles.container}>
        <SearchHeader
          regione={regione}
          provincia={provincia}
          comune={comune}
          settore={settore}
          navigation={navigation}
          setSearch={search => {
            setSearch(search);
          }}
        />
        <View style={styles.postBody}>
          {isBigDevice ? (
            <View style={styles.subContainer}>
              <View style={{ flex: 1 }}>
                <FiltersPage settore={settore} navigation={navigation} />
              </View>
              <View style={{ flex: 4 }}>
                <ScrollView>{renderPosts()}</ScrollView>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1
              }}
            >
              <ScrollView
                style={{ zIndex: 1 }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                {renderPosts()}
                <View style={{height:25}}></View>
              </ScrollView>
            </View>
          )}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4F4"
  },
  postBody: {
    flex: 5
  },
  resultText: {
    textAlign: "center",
    fontSize: Platform.OS == "web" ? 22 : 15,
    margin: Platform.OS == "web" ? 20 : 7
  },
  subContainer: {
    flex: 1,
    flexDirection: "row"
  },
  penWrapper: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
    zIndex: 100
  }
});

Explore.navigationOptions = {
  header:null
}