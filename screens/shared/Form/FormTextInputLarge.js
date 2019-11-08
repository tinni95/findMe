import React, {useState} from "react";
import {View, TextInput, StyleSheet} from "react-native";
import {FormStyles} from "./FormStyles";
import { Bold } from '../../../components/StyledText';

export default function FormTextInputLarge({placeholder,reference,error,secureTextEntry,onChangeText,errorText,nextInput}){
   return (
     <View>
      <Bold style={styles.textHeading}>{placeholder}</Bold>
    <TextInput
        style={{
          margin:5,
          padding:5,
          borderColor: '#ADADAD',
          borderWidth: 1,
          height:75,
        }
        }
        multiline
        numberOfLines={4}
        numberOfLines={4}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#ADADAD"
        onChangeText={onChangeText}
        ref={reference}
        editable
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

const styles= StyleSheet.create({
  textHeading:{
    marginLeft: 5, 
    marginBottom: 15, 
    marginTop:25,
    color: '#5F5E5E' 
 }
})