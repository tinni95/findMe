import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
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

const CREATEAPPLICATION_MUTATION = gql`
mutation createApplication($postId: ID!, $positionId:ID!) {
  createApplication(postId:$postId,positionId:$positionId) {
        id
    }
}`;

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
    }
    positions {
      id
      description
      title
      field
      requisiti
    }
  }
}
`;

const user = gql`
{
  currentUser{
    id
  }
}
`

export default function PostScreen({ navigation }) {
  const { loading, error, data } = useQuery(Post, { variables: { postId: navigation.getParam("id") } });
  const [createApplication] = useMutation(CREATEAPPLICATION_MUTATION,
    {
      onCompleted: async ({ createApplication }) => {
        alert("success")
        console.log(createApplication)
      }
    });
  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;


  const submitPosition = position => {
    createApplication({ variables: { positionId: position.id, postId: data.singlePost.id } })
    Haptics.selectionAsync()
  }

  const positionCards = () => {
    return data.singlePost.positions.map((position, index) => {
      return <PositionCard buttonOnPress={() => {
        submitPosition(position)
      }} buttonText={"Candidati"} navigation={navigation} key={index} position={position} />;
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
