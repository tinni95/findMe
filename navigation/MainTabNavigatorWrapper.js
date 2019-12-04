import React from "react"
import { useQuery } from "react-apollo";
import UserModal from "./UserModal"
import MainTabNavigator from "./MainTabNavigator"
import gql from "graphql-tag";
import FindMeSpinner from "../shared/FindMeSpinner";
import FindMeGraphQlErrorDisplay from "../shared/FindMeSpinner"

const User = gql`
{
  currentUser{
    pictureUrl
    email
    nome
    cognome
  }
}`

export default function MainTabNavigatorWrapper({ screenProps }) {
  const { loading, error, data } = useQuery(User)
  console.log(data)

  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;
  if (data) {
    if (data.currentUser) {
      if (data.currentUser.pictureUrl == null) {
        return <UserModal screenProps={{ currentUser: data.currentUser }} />
      }
      else { return <MainTabNavigator screenProps={screenProps} /> }
    }
  }
}