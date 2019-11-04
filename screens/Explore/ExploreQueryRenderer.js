import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Explore from "./Explore"
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"

const posts = gql`
{
  postsFeed {
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
  const { loading, error, data } = useQuery(posts);

  if (loading) return <FindMeSpinner/>;
  if (error) return <FindMeGraphQlErrorDisplay/>;

  return <Explore posts={data.postsFeed} navigation={navigation} />;
}


ExploreQueryRenderer.navigationOptions = {
  header: null
};
