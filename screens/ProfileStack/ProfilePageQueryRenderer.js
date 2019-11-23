import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProfilePage from "./ProfilePage"
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"

const User = gql`
  {
    currentUser {
      email
    }
  }
`;

export default function ProfilePagPeRenderer({ navigation }) {
  const { loading, error, data } = useQuery(User);

  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;
  if (!data || !data.currentUser) navigation.navigate("AuthenticationStack")
  return <ProfilePage navigation={navigation} user={data.currentUser} />;
}


