import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"
import PostScreen from "./PostScreen";
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const Post = gql`
query PostScreenQueryRendererQuery($postId: ID!) {
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

export default function PostScreenQueryRenderer({ navigation }) {
  const { loading, error, data } = useQuery(Post, { variables: { postId: navigation.getParam("id") } });

  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;

  return <PostScreen post={data.singlePost} />;
}


PostScreenQueryRenderer.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name={"ios-arrow-back"}
          size={25}
          style={{ marginLeft: 10 }}
          color={"#10476C"}
        ></Ionicons>
      </TouchableOpacity>
    )
  }
}