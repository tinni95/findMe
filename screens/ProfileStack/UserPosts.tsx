import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import PostCardEdit from "../../shared/components/PostCard/PostCardEdit";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../shared/constants/Colors";
import HeaderStyles from "../../shared/constants/HeaderStyles";
import TenditSpinner from "../../shared/graphql/TenditSpinner";
import TenditErrorDisplay from "../../shared/graphql/TenditErrorDisplay";

const posts = gql`
  {
    userPosts {
      id
      titolo
      descrizione
      settori
      comune
      regione
      postedBy {
        pictureUrl
        nome
        cognome
      }
      provincia
      posizioni {
        id
        descrizione
        requisiti
        settore
      }
    }
  }
`;

const DELETEPOST_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default function UserPosts({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(posts);
  const [deletePost] = useMutation(DELETEPOST_MUTATION, {
    onCompleted: async ({ deletePost }) => {
      refetch();
    }
  });

  if (loading) return <TenditSpinner />;
  if (error) return <TenditErrorDisplay />;
  if (data) {
    const onRefresh = async () => {
      setRefreshing(true);
      refetch().then(() => setRefreshing(false));
    };

    const deleteP = id => {
      // Works on both Android and iOS
      Alert.alert(
        "sei sicuro?",
        "sicuro che vuoi eliminare il post, definitivamente?",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              deletePost({ variables: { id } });
            }
          }
        ],
        { cancelable: false }
      );
    };

    const renderPosts = () => {
      return data.userPosts.map((post, index) => {
        return (
          <PostCardEdit
            onPress={() =>
              navigation.navigate("PostScreen", {
                id: post.id,
                onGoBack: () => refetch()
              })
            }
            deletePost={() => deleteP(post.id)}
            key={index}
            post={post}
          />
        );
      });
    };
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {renderPosts()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4F4"
  },
  subContainer: {
    flex: 1,
    flexDirection: "row"
  }
});

UserPosts.navigationOptions = ({ navigation }) => {
  return {
    title: "I miei Post",
    headerStyle: HeaderStyles.headerStyle,
    headerTitleStyle: HeaderStyles.headerTitleStyle,
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons
          name={"ios-menu"}
          size={25}
          style={{ marginLeft: 10 }}
          color={Colors.blue}
        ></Ionicons>
      </TouchableOpacity>
    )
  };
};
