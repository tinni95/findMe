import React from "react";
import { View, StyleSheet } from "react-native";
import { Bold, Body } from "./StyledText";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import TenditSpinner from "../graphql/TenditSpinner";
import Colors from "../constants/Colors";

const USER_STATUS = gql`
  {
    currentUser {
      email
      isVerified
    }
  }
`;

export default function AccountStatus() {
  const { data, loading } = useQuery(USER_STATUS, { fetchPolicy: "no-cache" });
  if (loading) {
    return <TenditSpinner />;
  } else {
    if (data.currentUser.isVerified) {
      return (
        <View style={styles.container}>
          <Bold>{data.currentUser.email}</Bold>
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
          <Bold style={styles.email}>{data.currentUser.email}</Bold>
          <View style={styles.statusContainer}>
            <Body style={styles.statusText}>stato:</Body>
            <View style={styles.statusRed} />
            <Body style={styles.statusText}>da confermare</Body>
          </View>
          <Body style={styles.statusLink}>ri-invia email</Body>
        </View>
      );
    }
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
