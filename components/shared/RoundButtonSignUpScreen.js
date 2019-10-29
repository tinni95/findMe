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
          { backgroundColor: props.color, width: props.isLong ? 200 : undefined }
        ]}>
        <Bold style={styles.text}>{props.text}</Bold>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 25,
    borderWidth: 1,
    padding: isSmallDevice ? 7.5 : 10,
    height: isSmallDevice ? 30 : 40
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: isSmallDevice ? 11 : 12,
    marginLeft: 2
  }
});
