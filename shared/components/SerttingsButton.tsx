import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from "react-native";
import { Light, Bold, Body } from "./StyledText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

type SettingsButtonProps = {
  onPress: any;
  color?: string;
  text: string;
};

const SettingsButton: FunctionComponent<SettingsButtonProps> = ({
  onPress,
  color,
  text
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Light style={{ color }}>{text}</Light>
    <Ionicons
      name={"ios-arrow-forward"}
      size={25}
      style={{ paddingRight: 10, marginTop: 2.5 }}
      color={Colors.blue}
    ></Ionicons>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1
  },
  text: {
    color: "white",
    fontSize: 11,
    marginLeft: 2
  }
});

export default SettingsButton;
