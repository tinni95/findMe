import React from "react";
import { View } from "react-native";
import { FormStyles } from "./FormStyles";
import { Bold } from "../StyledText";

export default function WithErrorString(props) {
  return (
    <View>
      {props.children}
      {props.error ? (
        <Bold style={FormStyles.error}>{props.errorText}</Bold>
      ) : (
        <View style={{ height: 5 }} />
      )}
    </View>
  );
}
