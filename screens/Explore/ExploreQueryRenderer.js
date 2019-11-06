import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Explore from "./Explore"
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"

const posts = gql`
  query posts($filter:String,$settore:[String!]){
  postsFeed(filter:$filter, settore: $settore) {
    id
    title
    description
    startDate
    field
    comune
    regione
    positions{
    id
    available
    field
    }
  }
}

`;

export default function ExploreQueryRenderer({navigation}) {
  const filter = navigation.getParam("filter") || "";
  const settore = navigation.getParam("settore") || null;
  const { loading, error, data } = useQuery(posts,{
    variables: {filter,settore}
  });

  if (loading) return <FindMeSpinner/>;
  if (error) return <FindMeGraphQlErrorDisplay/>;

  return <Explore posts={data.postsFeed} navigation={navigation} />;
}


ExploreQueryRenderer.navigationOptions = {
  header: null
};
