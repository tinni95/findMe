import React, { useEffect } from "react";

import { StyleSheet, View, Image } from "react-native";
import { Body } from "../../shared/components/StyledText";
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
          source={require("../../assets/images/create_full.png")}
          style={{ width: 26, height: 28 }}
        ></Image>
        <Body
          style={{
            fontSize: 8,
            textAlign: "center",
            color: Colors.blue,
            marginTop: 3,
            marginRight: 4
          }}
        >
          Inserisci
        </Body>
      </View>
    );
  }
  return (
    <View style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/create_empty.png")}
        style={{ width: 26, height: 28 }}
      ></Image>
      <Body
        style={{
          fontSize: 8,
          textAlign: "center",
          marginTop: 3,
          marginRight: 4
        }}
      >
        Inserisci
      </Body>
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
