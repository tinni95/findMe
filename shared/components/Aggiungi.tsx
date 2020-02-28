import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Bold } from "./StyledText";
import Colors from "../constants/Colors";
export default function Aggiungi({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.aggiungiWrapper}>
      <Bold style={styles.aggiungiText}>+ AGGIUNGI {text}</Bold>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  aggiungiWrapper: {
    height: 65,
    alignItems: "center",
    justifyContent: "center"
  },
  aggiungiText: {
    color: Colors.blue,
    fontSize: 12
  }
});
