import React from "react";
import { TextInput } from "react-native";

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