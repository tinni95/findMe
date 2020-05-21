import React from 'react';
import { StyleSheet } from 'react-native';
import { Light } from './StyledText';
import Colors from '../constants/Colors';

export default function TabBarText({ focused, text }) {
  if (focused) {
    return <Light style={styles.focused}>{text}</Light>;
  }
  return <Light style={styles.text}>{text}</Light>;
}

const styles = StyleSheet.create({
  focused: {
    fontSize: 10,
    color: Colors.blue,
    marginBottom: 2.5,
  },
  text: {
    fontSize: 10,
    color: 'grey',
    marginBottom: 2.5,
  },
});
