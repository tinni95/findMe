import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image } from "react-native"
import { Body } from "./StyledText";
import Colors from "../constants/Colors";
import { useQuery, useSubscription, useMutation } from "react-apollo";
import { gql } from "apollo-boost";

const OPENCHATS_MUTATION = gql`
mutation{
  openChatsSub{
    count
  }
  openChatsPub{
    count
  }
}
`

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
  const [openChats] = useMutation(OPENCHATS_MUTATION,
    {
      onCompleted: () => {
        refetch()
      }
    });
  const { loading, error, refetch, data } = useQuery(UNSEENMESSAGES_QUERY, { fetchPolicy: "no-cache" })
  const subscription = useSubscription(
    NEWMESSAGE_SUBSCRIPTION,
    {
      variables: { id: data && data.currentUser.id },
      onSubscriptionData: () => {
        refetch()
      }
    },
  );

  const focused = props.navigation.getParam("focused")
  useEffect(() => {
    if (focused) {
      console.log("genny")
      openChats();
      props.navigation.setParams({ focused: false })
    }
  }, [focused])

  if (loading) {
    return (<Image source={require("../assets/images/Messaggi_empty.png")} style={{ width: 25, height: 25 }}></Image>)
  }
  if (data) {
    return (
      <View style={data.UnseenChats.length > 0 && styles.container}>
        {props.focused ?
          <Image source={require("../assets/images/Messaggi_Full.png")} style={{ width: 25, height: 25 }}></Image> :
          <Image source={require("../assets/images/Messaggi_empty.png")} style={{ width: 25, height: 25 }}></Image>
        }
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
    marginRight: -5
  },
  counter: {
    height: 13,
    width: 13,
    borderRadius: 6.5,
    marginLeft: -3,
    backgroundColor: Colors.red,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 9
  }
})