import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native"
import { Body } from "./StyledText";
import Colors from "../constants/Colors";
import { useQuery, useSubscription } from "react-apollo";
import { gql } from "apollo-boost";

const UNSEENMESSAGES_QUERY = gql`
{
UnseenChats{
  pubRead
}
currentUser{
  id
}
}
`

const NEWMESSAGE_SUBSCRIPTION = gql`
subscription messageReceivedNotificaSub($id:ID!){
  messageReceivedNotificaSub(id:$id){
    updatedFields
  }
}`;


export default function MessagesIcon(props) {
  const { loading, error, refetch, data } = useQuery(UNSEENMESSAGES_QUERY, { fetchPolicy: "no-cache" })
  const subscription = useSubscription(
    NEWMESSAGE_SUBSCRIPTION,
    { variables: { id: data && data.currentUser.id } }
  );

  useEffect(() => {
    console.log(subscription.data)
    !subscription.loading && subscription.data.messageReceivedNotificaSub ? refetch() : null
  }, [subscription.data])

  if (loading) {
    return (<Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? "#10436E" : "grey"}
    />)
  }
  if (data) {
    return (
      <View style={data.UnseenChats.length > 0 && styles.container}>
        <Ionicons
          name={props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={props.focused ? "#10436E" : "grey"}
        />
        {data.UnseenChats.length > 0 &&
          <View style={styles.counter}>
            <Body style={styles.text}>{data.UnseenChats.length}</Body>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: -15
  },
  counter: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.red,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 11
  }
})