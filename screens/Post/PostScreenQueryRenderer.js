import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"
import PostScreen from "./PostScreen";

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
      title
      field
      requisiti
    }
  }
}
`;

export default function ProfilePageQueryRenderer({ navigation }) {
  const { loading, error, data } = useQuery(Post, { variables: { postId: navigation.getParam("id") } });

  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;

  return <PostScreen post={data.singlePost} />;
}


