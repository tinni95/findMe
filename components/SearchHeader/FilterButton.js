import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';


export default function FilterButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>

    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 10
  }
});
