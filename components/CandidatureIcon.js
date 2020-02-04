import React, { useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { Body } from "./StyledText";
import Colors from "../constants/Colors";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import SocketContext from "../Socket/context"

const UNSEENAPPLICATIONS_QUERY = gql`
{
UnseenApplications{
  pubRead
}
currentUser{
  id
}
}
`


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export function CandidatureIcon({ onPress, socket }) {
  const { loading, refetch, data } = useQuery(UNSEENAPPLICATIONS_QUERY, { fetchPolicy: "no-cache" })

  useEffect(() => {
    socket.on("postnotifica", msg => {
      wait(1000).then(() => refetch());
    })
  })

  if (loading) {
    return (<Image source={require("../assets/images/arrows.png")} style={{ marginRight: 5, width: 25, height: 25 }}></Image>)
  }
  if (data) {
    return (
      <TouchableOpacity onPress={() => onPress()} style={data.UnseenApplications.length > 0 && styles.container}>
        <Image source={require("../assets/images/arrows.png")} style={{ marginRight: 5, width: 35, height: 25 }}></Image>
        {data.UnseenApplications.length > 0 &&
          <View style={styles.counter}>
            <Body style={styles.text}>{data.UnseenApplications.length}</Body>
          </View>
        }
      </TouchableOpacity>
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

const CandidatureIconWS = props => (
  <SocketContext.Consumer>
    {socket => <CandidatureIcon {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default CandidatureIconWS