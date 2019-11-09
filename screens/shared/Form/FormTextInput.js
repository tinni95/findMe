import React, {useState} from "react";
import {View, TextInput} from "react-native";
import {FormStyles} from "./FormStyles";
import { Bold } from '../../../components/StyledText';

export default function FormTextInput({reference,error,secureTextEntry,onChangeText,placeholder,errorText,nextInput}){
   return (
    <View>
    <TextInput
        style={error ? FormStyles.inputError : FormStyles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#ADADAD"
        onChangeText={onChangeText}
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