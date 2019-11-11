import React, {useState} from "react";
import {View, TextInput} from "react-native";
import {FormStyles} from "./FormStyles";
import { Bold } from '../../../components/StyledText';

export default function FormTextInput(props,{reference,error,errorText,nextInput}){
   return (
    <View>
    <TextInput
        {...props}
        style={error ? FormStyles.inputError : FormStyles.input}
        placeholderTextColor="#ADADAD"
        ref={reference}
        onSubmitEditing={nextInput}
    />
  {error ? (
    <Bold style={FormStyles.error}>{errorText}</Bold>
  ) : (
      <View style={{ height: 5 }} />
    )}
    </View>
   )
}