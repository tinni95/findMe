import React from "react";
import { TextInput} from "react-native";
import {FormStyles} from "./FormStyles";

export default function FormTextInput(props){
   return (
    <TextInput
    {...props}
    style={props.error ? FormStyles.inputError : FormStyles.input}
/>
   )
}