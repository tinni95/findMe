import React from "react";
import { TextInput } from "react-native";

export default function FormTextInput(props) {
  if (props.large == "true") {
    return <TextInput ref={props.reference} {...props} />;
  }
  return <TextInput ref={props.reference} {...props} />;
}
