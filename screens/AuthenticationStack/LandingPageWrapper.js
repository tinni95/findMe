import React, { useEffect } from 'react';
import FindMeSpinner from '../../shared/FindMeSpinner';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const User = gql`
  {
    currentUser {
    nome
    }
  }
`;

export default function LandingPageWrapper({ navigation }) {
  const { loading, error, data } = useQuery(User);
  console.log("landing", data)
  useEffect(() => {
    data && data.currentUser ? navigation.navigate('MainTabNavigator') :
      navigation.navigate('LandingPage');
  }, [data])

  return <FindMeSpinner />;
}

