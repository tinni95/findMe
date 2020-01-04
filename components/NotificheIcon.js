import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native"
import { Body } from "./StyledText";
import Colors from "../constants/Colors";
export default function NotificheIcon(props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={props.focused ? "#10436E" : "grey"}
      />
      <View style={styles.counter}>
        <Body style={styles.text}>1</Body>
      </View>
    </View>
  );
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