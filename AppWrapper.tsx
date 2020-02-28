import React from "react";
import MainTabNavigator from "./navigation/MainTabNavigator";
import io from "socket.io-client";
import { socketEndPoint } from "./shared/constants/urls";
import SocketContext from "./shared/SocketContext";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import TenditSpinner from "./shared/graphql/TenditSpinner";

const User = gql`
  {
    currentUser {
      id
    }
  }
`;
export default function AppWrapper() {
  const { data, loading } = useQuery(User, {
    onCompleted: currentUser => {
      console.log("currentUser");
    }
  });
  if (loading) return <TenditSpinner />;
  else
    return (
      <SocketContext.Provider
        value={io(socketEndPoint, {
          query: { token: data.currentUser.id }
        })}
      >
        <MainTabNavigator></MainTabNavigator>
      </SocketContext.Provider>
    );
}
