import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Anteprima from "./Anteprima";
import TenditSpinner from "../../../shared/graphql/TenditSpinner";
import TenditErrorDisplay from "../../../shared/graphql/TenditErrorDisplay";

const User = gql`
  {
    currentUser {
      nome
      cognome
    }
  }
`;

export default function AnteprimaPageRenderer({ navigation }) {
  const { loading, error, data } = useQuery(User, { fetchPolicy: "no-cache" });
  if (loading) return <TenditSpinner />;
  if (error) return <TenditErrorDisplay />;

  return <Anteprima navigation={navigation} user={data.currentUser} />;
}
