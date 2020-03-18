import React, { useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Body } from "./StyledText";
import Colors from "../constants/Colors";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import SocketContext from "../SocketContext";

const UNSEENAPPLICATIONS_QUERY = gql`
  {
    UnseenApplications {
      pubRead
    }
    currentUser {
      id
    }
  }
`;

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function CandidatureIcon(props) {
  const { loading, refetch, data } = useQuery(UNSEENAPPLICATIONS_QUERY, {
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    props.socket.on("postnotifica", msg => {
      console.log("NOTIFICA");
      wait(1000).then(() => refetch());
    });
  });

  if (loading) {
    return (
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/arrows.png")}
          style={{ marginRight: 5, width: 35, height: 25 }}
        ></Image>
        <Body style={[styles.text, { color: Colors.blue }]}>Candidature</Body>
      </View>
    );
  }
  if (data) {
    return (
      <View style={styles.content}>
        <View style={data.UnseenApplications.length > 0 && styles.container}>
          <Image
            source={
              props.focused
                ? require("../../assets/images/arrows-active.png")
                : require("../../assets/images/arrows.png")
            }
            style={{ marginRight: 5, width: 35, height: 25 }}
          ></Image>
          {data.UnseenApplications.length > 0 && (
            <View style={styles.counter}>
              <Body style={styles.counterText}>
                {data.UnseenApplications.length}
              </Body>
            </View>
          )}
        </View>
        <Body
          style={[
            styles.text,
            { color: props.focused ? Colors.blue : "black" }
          ]}
        >
          Candidature
        </Body>
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
    backgroundColor: Colors.red
  },
  content: { width: 80, justifyContent: "center", alignItems: "center" },
  text: {
    fontSize: 8,
    textAlign: "center",
    marginTop: 3,
    marginRight: 0
  },
  counterText: {
    fontSize: 8,
    textAlign: "center",
    marginTop: 1,
    color: "white",
    marginRight: 0
  }
});

const CandidatureIconWS = props => (
  <SocketContext.Consumer>
    {socket => <CandidatureIcon {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default CandidatureIconWS;
