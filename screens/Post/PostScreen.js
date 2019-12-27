import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { isSmallDevice } from '../../constants/Layout';
import { Bold, Light } from '../../components/StyledText';
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
import TouchablePen from '../ProfileStack/shared/TouchablePen';
import { sendNotification } from '../../shared/PushNotifications';

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
    pubblicatoDa
    postedBy{
      id
      pushToken
    }
    positions {
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
    },
    fetchPolicy: "no-cache"
  })

  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;


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
      }} post={data.singlePost} buttonText={"Candidati"} button={data.currentUser.id === data.singlePost.postedBy.id} navigation={navigation} key={index} position={position} />;
    });
  };
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.descriptionCard}>
        <Bold style={styles.title}>{data.singlePost.title}</Bold>
        <LocationWithText
          points={20}
          fontSize={14}
          style={styles.location}
          comune={data.singlePost.comune}
          regione={data.singlePost.regione}
        />
        <PostInfo tipoSocio={data.singlePost.type} pubblicatoDa={data.singlePost.pubblicatoDa}
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
    backgroundColor: 'white'
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
  const isOwner = navigation.getParam("isOwner")
  return {
    headerStyle: {
      ...Platform.select({
        ios: {
          shadowColor: "black",
          shadowOffset: { height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3
        },
        android: {
          elevation: 20
        },
      })
    },
    headerTitleStyle: {
      fontFamily: "sequel-sans-bold",
      color: Colors.blue,
      fontSize: 12
    },
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
      isOwner && <TouchablePen size={22}><Bold style={{ color: Colors.blue, marginRight: 20, marginTop: 5 }}>MODIFICA</Bold></TouchablePen>
    ),
  }
}