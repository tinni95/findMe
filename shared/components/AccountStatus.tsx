import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Bold, Body } from "./StyledText";
import Colors from "../constants/Colors";
export default function AccountStatus({ onPress, currentUser }) {
  if (currentUser.isVerified) {
    return (
      <View style={styles.container}>
        <Bold>{currentUser.email}</Bold>
        <View style={styles.statusContainer}>
          <Body style={styles.statusText}>stato:</Body>
          <View style={styles.statusGreen} />
          <Body style={styles.statusText}>Confermato</Body>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Bold style={styles.email}>{currentUser.email}</Bold>
        <View style={styles.statusContainer}>
          <Body style={styles.statusText}>stato:</Body>
          <View style={styles.statusRed} />
          <Body style={styles.statusText}>da confermare</Body>
        </View>
        <Body style={styles.statusLink} onPress={onPress}>
          ri-invia email
        </Body>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  statusContainer: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row"
  },
  statusRed: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    margin: 5,
    backgroundColor: Colors.red
  },
  statusGreen: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    margin: 5,
    backgroundColor: "lightgreen"
  },
  statusText: {
    color: "#5D5151"
  },
  statusLink: {
    color: "#00A6FF",
    marginTop: 10
  },
  email: {
    fontSize: 18
  }
});
