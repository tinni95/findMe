import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Bold } from '../StyledText';
import { isSmallDevice } from '../../constants/Layout';

export default function RoundButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.container,
          { borderColor: props.color, width: props.isLong ? 200 : null }
        ]}>
        <Bold style={[styles.text, { color: props.color }]}>{props.text}</Bold>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    padding: 10
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
    marginLeft: 2
  }
});
