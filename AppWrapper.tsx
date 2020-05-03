import React, { useEffect } from "react";
import MainTabNavigator from "./navigation/MainTabNavigator";
import io from "socket.io-client";
import { socketEndPoint } from "./shared/constants/urls";
import SocketContext from "./shared/SocketContext";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import TenditSpinner from "./shared/graphql/TenditSpinner";
import PushNotifications from "./shared/functions/PushNotifications";
import { Text, View } from "react-native";

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

export default function AppWrapper({logout}) {
  const { data, loading,error } = useQuery(User, {
    onCompleted: currentUser => {
      currentUser ? console.log("yes") : console.log("no")
    },
  });

  const [updateUser] = useMutation(UpdateUser);

  useEffect(() => {
    console.log("here");
    PushNotifications(updateUser);
  }, []);

  if (loading) return <TenditSpinner />;
  else {
    if(data.currentUser){
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
    else{
      return <View>
        {logout()}
      </View>
    }
  }


}