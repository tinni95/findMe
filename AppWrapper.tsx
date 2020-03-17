import React, { useEffect } from "react";
import MainTabNavigator from "./navigation/MainTabNavigator";
import io from "socket.io-client";
import { socketEndPoint } from "./shared/constants/urls";
import SocketContext from "./shared/SocketContext";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import TenditSpinner from "./shared/graphql/TenditSpinner";
import PushNotifications from "./shared/functions/PushNotifications";

const UpdateUser = gql`
  mutation updateUser($pushToken: String) {
    updateUser(pushToken: $pushToken) {
      pushToken
    }
  }
`;

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

  const [updateUser] = useMutation(UpdateUser);

  useEffect(() => {
    console.log("here");
    PushNotifications(updateUser);
  }, []);

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
