import React, { useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Body, Bold } from "./StyledText";
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
    console.log("REFETCH")
    wait(500).then(()=>refetch())
  },[props.socket.refetch]);

  if (loading) {
    return (
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/CandidatureIcon.png")}
          style={{ marginRight: 5, width: 30, height: 27 }}
        ></Image>
        <Body style={[styles.text, { color: "white" }]}>Candidature</Body>
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
                ? require("../../assets/images/CandidatureIcon.png")
                : require("../../assets/images/CandidatureIcon.png")
            }
            style={{ marginRight: 5, width: 30, height: 27 }}
          ></Image>
          {data.UnseenApplications.length > 0 && (
            <View style={styles.counter}>
              <Body style={styles.counterText}>
                {data.UnseenApplications.length}
              </Body>
            </View>
          )}
        </View>
        <Bold
          style={[styles.text, { color: props.focused ? Colors.red : "white" }]}
        >
          CANDIDATURE
        </Bold>
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
    fontSize: 9,
    textAlign: "center",
    marginTop: 5,
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
