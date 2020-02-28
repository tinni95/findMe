import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Body, Light } from "./StyledText";
import { isSmallDevice } from "../constants/Layout";

export default function LocationWithText(props) {
  if (props.isLight) {
    return (
      <View style={[styles.container, props.style]}>
        <Ionicons
          name={"ios-pin"}
          size={props.points || 17}
          style={{ marginLeft: 3, marginTop: 5 }}
          color={"#DD1E63"}
        />
        <Light
          style={[
            styles.text,
            { top: 3.5, fontSize: props.fontSize, color: props.color }
          ]}
        >
          {`${props.comune}, ${props.regione}`}
        </Light>
      </View>
    );
  }
  return (
    <View style={[styles.container, props.style]}>
      <Ionicons
        name={"ios-pin"}
        size={props.points || 17}
        style={{ marginLeft: 3, marginTop: 5 }}
        color={"#DD1E63"}
      />
      <Body
        style={[
          styles.text,
          {
            top: 3.5,
            fontSize: props.fontSize,
            color: props.color || "#AFA9A9"
          }
        ]}
      >
        {`${props.comune}, ${props.regione}`}
      </Body>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: -3,
    flexDirection: "row",
    margin: 5,
    marginTop: isSmallDevice ? 3 : 7
  },
  text: {
    color: "#AFA9A9",
    fontSize: 15,
    marginLeft: 5,
    marginTop: 4
  }
});
