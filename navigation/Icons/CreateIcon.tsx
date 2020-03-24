import React, { useEffect } from "react";

import { StyleSheet, View, Image } from "react-native";
import { Body, Bold } from "../../shared/components/StyledText";
import Colors from "../../shared/constants/Colors";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import SocketContext from "../../shared/SocketContext";
import { wait } from "../../shared/functions/wait";

const UNOPENEDNOTIFICHE_QUERY = gql`
  {
    UnreadNotifiche {
      opened
    }
    currentUser {
      id
    }
  }
`;
const READNOTIFICA_MUTATION = gql`
  mutation {
    viewNotificas {
      count
    }
  }
`;

function CreateIcon(props) {
  if (props.focused) {
    return (
      <View
        style={{ width: 50, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={require("../../assets/images/createIcon.png")}
          style={{ width: 25, height: 25 }}
        ></Image>
        <Bold
          style={{
            fontSize: 9,
            textAlign: "center",
            color: Colors.red,
            marginTop: 5,
            marginRight: 2
          }}
        >
          INSERISCI
        </Bold>
      </View>
    );
  }
  return (
    <View style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/createIcon.png")}
        style={{ width: 25, height: 25 }}
      ></Image>
      <Bold
        style={{
          fontSize: 9,
          textAlign: "center",
          marginTop: 5,
          color: "white",
          marginRight: 2
        }}
      >
        INSERISCI
      </Bold>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: -5,
    paddingBottom: 5
  },
  counter: {
    height: 13,
    width: 13,
    borderRadius: 6.5,
    marginLeft: -8,
    backgroundColor: Colors.red
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 9
  }
});

export default CreateIcon;
