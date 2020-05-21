import React from 'react';
import { Body } from './StyledText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export const AddButton = ({ onPress, style, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.aggiungiButton}>
        <Body style={[style, styles.textHeading]}>{text}</Body>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textHeading: {
    color: '#DD1E63',
  },
  aggiungiButton: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 25,
    borderColor: Colors.red,
  },
});
