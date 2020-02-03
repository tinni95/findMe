import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native"
import { Body } from "./StyledText";
import Colors from "../constants/Colors";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import SocketContext from "../Socket/context"

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

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export function MessagesIcon(props) {
  const [openChats] = useMutation(OPENCHATS_MUTATION,
    {
      onCompleted: () => {
        refetch()
      }
    });
  const { loading, error, refetch, data } = useQuery(UNSEENMESSAGES_QUERY, { fetchPolicy: "no-cache" })

  useEffect(() => {
    props.socket.on("notifica", msg => {
      wait(1000).then(() => refetch());
    })
  })


  useEffect(() => {
    console.log("we")
  }, [props.refetch])

  if (loading) {
    return (<Image source={require("../assets/images/Messaggi_empty.png")} style={{ marginBottom: 5, width: 22, height: 22 }}></Image>)
  }
  if (data) {
    return (
      <View style={data.UnseenChats.length > 0 && styles.container}>
        <Image source={require("../assets/images/Messaggi_empty.png")} style={{ marginBottom: 5, width: 22, height: 22 }}></Image>
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

const MessagesIconWS = props => (
  <SocketContext.Consumer>
    {socket => <MessagesIcon {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default MessagesIconWS