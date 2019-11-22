import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Anteprima } from "./Anteprima"
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"

const User = gql`
  {
    currentUser {
      nome
      cognome
    }
  }
`;

export default function AnteprimaPageRenderer({ navigation }) {
    const { loading, error, data } = useQuery(User);
    console.log("data", data)
    if (loading) return <FindMeSpinner />;
    if (error) return <FindMeGraphQlErrorDisplay />;

    return <Anteprima navigation={navigation} user={data.currentUser} />;
}


