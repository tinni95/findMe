import React from "react";
import { TextInput, View } from "react-native";
import { FormStyles } from "./FormStyles";

export default function FormTextInput(props) {
   if (props.large == "true") {
      return (
         <TextInput
            {...props}
         />
      )
   }
   return (
      <TextInput
         {...props}
      />
   )
}