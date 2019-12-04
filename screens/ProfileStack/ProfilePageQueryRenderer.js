import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProfilePage from "./ProfilePage"
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"

const User = gql`
  {
    currentUser {
      email
      nome
      cognome
      pictureUrl
    }
  }
`;

export default function ProfilePageRenderer({ navigation, screenProps }) {
  const { loading, error, data } = useQuery(User);
  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;
  if (!data || !data.currentUser) navigation.navigate("AuthenticationStack")
  return <ProfilePage screenProps={screenProps} navigation={navigation} user={data.currentUser} />;
}


