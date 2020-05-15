import React, { useEffect, useState } from "react";
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
  const { data, loading,error } = useQuery(User);

  const [updateUser] = useMutation(UpdateUser);
  const [refetch,setRefetch] = useState(124124123);
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    PushNotifications(updateUser);
  }, []);

  useEffect(() => {
    if(!loading){
      if(!data){
        return logout()
      }
      if(!data.currentUser){
        return logout()
      }
    const socket=io(socketEndPoint, {
      query: { token: data.currentUser.id }
    })
    socket.on("chat message", () => {
      setRefetch(Math.floor(Math.random() * -1000))
      console.log("message")
    })
    setSocket(socket)
  }
  }, [loading]);

  if (loading||!socket) return <TenditSpinner />;
  else {
    if(data.currentUser){
      return (
        <SocketContext.Provider
          value={{socket,refetch,setRefetch}}>
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