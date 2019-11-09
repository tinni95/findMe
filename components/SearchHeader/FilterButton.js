import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';


export default function FilterButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Image source={require("../../assets/images/controls.png")}
      style={{width:25,height:25}}/>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 10,
    top:17.5
  }
});
