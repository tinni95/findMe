import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Bold } from "./StyledText";

export default function NotificaBubble(props) {
  return (
    <View style={styles.notifica}>
      <Bold style={styles.notificaText}>{props.count}</Bold>
    </View>
  );
}

const styles = StyleSheet.create({
  notifica: {
    backgroundColor: Colors.red,
    marginTop: 12,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    alignItems: "center",
    justifyContent: "center"
  },
  notificaText: { textAlign: "center", color: "white", fontSize: 9 }
});
