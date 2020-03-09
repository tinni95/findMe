import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Bold } from "./StyledText";

export default function WithNotifica(props) {
  if (props.count == 0) {
    return props.children;
  }
  return (
    <View style={{ flexDirection: "row" }}>
      {props.children}
      <View style={styles.notifica}>
        <Bold style={styles.notificaText}>{props.count}</Bold>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notifica: {
    backgroundColor: Colors.red,
    marginLeft: -20,
    marginTop: 9,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    alignItems: "center",
    justifyContent: "center"
  },
  notificaText: { textAlign: "center", color: "white", fontSize: 9 }
});
