import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { isSmallDevice } from '../../constants/Layout';
import { Bold, Light, Body } from '../../components/StyledText';
import LocationWithText from '../../components/shared/LocationWithText';
import { PositionCard } from '../../components/PositionCard';
import PostInfo from './PostInfo';
import * as Haptics from 'expo-haptics';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { sendNotification } from '../../shared/PushNotifications';
import HeaderStyles from '../shared/HeaderStyles';
import { Alert } from 'react-native';

const DELETEPOST_MUTATION = gql`
mutation deletePost($id:ID!){
  deletePost(id:$id){
        id
    }
}
`

const Post = gql`
query PostScreenQuery($postId: ID!) {
  singlePost(id: $postId) {
    id
    description
    title
    comune
    regione
    provincia
    fields
    type
    posizione
    postedBy{
      nome
      cognome
      id
      pushToken
    }
    positions {
      type
      id
      description
      title
      field
      requisiti
    }
  }
  currentUser{
    id
  }
}
`;


export default function PostScreen({ navigation }) {
  const { loading, error, data } = useQuery(Post, {
    variables: {
      postId: navigation.getParam("id"),
    },
    onCompleted: async ({ currentUser, singlePost }) => {
      const isOwner = currentUser.id === singlePost.postedBy.id
      navigation.setParams({ isOwner });
      navigation.setParams({ deleteP })
    },
    fetchPolicy: "no-cache"
  })

  const [deletePost] = useMutation(DELETEPOST_MUTATION, {
    onCompleted: async ({ deletePost }) => {
      console.log(deletePost)
    },
  })

  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;

  const deleteP = () => {
    // Works on both Android and iOS
    Alert.alert(
      'sei sicuro?',
      'sicuro che vuoi eliminare il post, definitivamente?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            deletePost({ variables: { id: navigation.getParam("id") } })
            navigation.state.params.onGoBack();
            navigation.goBack()
          },
        },
      ],
      { cancelable: false },
    );
  }

  const submitPosition = position => {
    sendNotification({
      to: data.singlePost.postedBy.pushToken,
      title: data.singlePost.title,
      body: "Qualcuno si è applicato alla tua posizione di" + position.title
    })
    Haptics.selectionAsync()
  }

  const positionCards = () => {
    return data.singlePost.positions.map((position, index) => {
      return <PositionCard buttonOnPress={() => {
        submitPosition(position)
      }} buttonText={"Candidati"} post={data.singlePost} button={data.currentUser.id === data.singlePost.postedBy.id} navigation={navigation} key={index} position={position} />;
    });
  };
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.descriptionCard}>
        <Bold style={styles.title}>{data.singlePost.title}</Bold>
        <LocationWithText
          fontSize={14}
          style={styles.location}
          comune={data.singlePost.comune}
          regione={data.singlePost.regione}
        />
        <PostInfo tipoSocio={data.singlePost.type} user={data.singlePost.postedBy}
          fields={data.singlePost.fields}
          posizione={data.singlePost.posizione} />
        <View style={styles.DesriptionContainer}>
          <Bold style={styles.titleSm}>Descrizione</Bold>
          <Light style={styles.body}>{data.singlePost.description}</Light>
        </View>
      </View>
      <View>
        {positionCards()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  descriptionCard: {
    backgroundColor: 'white',
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
    backgroundColor: '#F7F4F4'
  }
});



PostScreen.navigationOptions = ({ navigation }) => {
  const isOwner = navigation.getParam("isOwner");
  const deleteP = navigation.getParam("deleteP");

  return {
    headerStyle: HeaderStyles.headerStyle,
    headerTitleStyle: HeaderStyles.headerTitleStyle,
    headerLeft: (
      <TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => navigation.goBack()}>
        <Ionicons
          name={"ios-arrow-back"}
          size={25}
          style={{ marginLeft: 10 }}
          color={Colors.blue}
        ></Ionicons>
      </TouchableOpacity>
    ),
    headerRight: (
      isOwner && <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => deleteP()}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Bold style={{ color: Colors.red }}>Elimina</Bold>
        </View>
        <Ionicons
          name={"ios-trash"}
          size={25}
          style={{ margin: 10 }}
          color={Colors.red}
        ></Ionicons>
      </TouchableOpacity>
    ),
  }
}