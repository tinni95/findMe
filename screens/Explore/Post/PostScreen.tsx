import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { isSmallDevice } from "../../../shared/constants/Layout";
import { Bold, Light, Body } from "../../../shared/components/StyledText";
import LocationWithText from "../../../shared/components/LocationWithText";
import { PositionCard } from "../../../shared/components/PositionCard";
import PostInfo from "./PostInfo";
import * as Haptics from "expo-haptics";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import TenditSpinner from "../../../shared/graphql/TenditSpinner";
import TenditErrorDisplay from "../../../shared/graphql/TenditErrorDisplay";
import { sendNotification } from "../../../shared/functions/PushNotifications";
import { Alert } from "react-native";
import HeaderRightElimina from "../../../shared/components/HeaderRightElimina";

const DELETEPOST_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const Post = gql`
  query PostScreenQuery($postId: ID!) {
    singlePost(id: $postId) {
      id
      descrizione
      titolo
      comune
      regione
      provincia
      settori
      posizione
      postedBy {
        nome
        cognome
        id
        pushToken
      }
      posizioni {
        opened
        type
        id
        descrizione
        titolo
        requisiti
      }
    }
    currentUser {
      id
    }
  }
`;

export default function PostScreen({ navigation, route }) {

  const [isOwner,setIsOwner] = useState(false);
  if(isOwner){
    navigation.setOptions({
      headerRight: () => <HeaderRightElimina onPress={() => deleteP()} />
    });
  }
  const { loading, error, data } = useQuery(Post, {
    variables: {
      postId: route.params.id
    },
    onCompleted: async ({ currentUser, singlePost }) => {
      if(currentUser.id === singlePost.postedBy.id){
        setIsOwner(true)
      }
    },
    fetchPolicy: "no-cache"
  });

  const [deletePost] = useMutation(DELETEPOST_MUTATION, {
    onCompleted: async ({ deletePost }) => {
      console.log(deletePost);
    }
  });

  if (loading) return <TenditSpinner />;
  if (error) return <TenditErrorDisplay />;

  const deleteP = () => {
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
            deletePost({ variables: { id: route.params?.id } });
            route.params?.onGoBack();
            navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const submitPosition = position => {
    sendNotification(
      data.singlePost.postedBy.pushToken,
      data.singlePost.title,
      "Qualcuno si è applicato alla tua posizione di" + position.title
    );
    Haptics.selectionAsync();
  };

  const positionCards = () => {
    return data.singlePost.posizioni.map((position, index) => {
      if(position.opened)
      return (
        <PositionCard
          button={data.currentUser.id === data.singlePost.postedBy.id}
          navigation={navigation}
          key={index}
          position={position}
          post={data.singlePost}
        />
      );
    });
  };
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.descriptionCard}>
        <Bold style={styles.title}>{data.singlePost.titolo}</Bold>
        <LocationWithText
          fontSize={14}
          style={styles.location}
          comune={data.singlePost.comune}
          regione={data.singlePost.regione}
        />
        <PostInfo
          user={data.singlePost.postedBy}
          settori={data.singlePost.settori}
          isHidden={true}
        />
        <View style={styles.DesriptionContainer}>
          <Bold style={styles.titleSm}>Descrizione</Bold>
          <Light style={styles.body}>{data.singlePost.descrizione}</Light>
        </View>
      </View>
      <View>{positionCards()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  descriptionCard: {
    backgroundColor: "white",
    borderBottomWidth: 10,
    borderBottomColor: "#F7F4F4"
  },
  image: {
    width: 200
  },
  title: {
    margin: 5,
    marginTop: 25,
    marginLeft: 5,
    marginRight: 10,
    fontSize: isSmallDevice ? 22 : 26
  },
  titleSm: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: "#10476C"
  },
  location: {
    marginLeft: 5,
    marginTop: 5
  },
  body: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 5
  },
  DesriptionContainer: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F7F4F4"
  }
});
