import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Light, Bold } from '../StyledText';
import { isSmallDevice } from '../../constants/Layout';

export default function RoundButton({ isLight, onPress, textColor, text, color, styleProps }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, styleProps, { backgroundColor: color }]}>
        {isLight ? <Light style={[styles.text, { color: textColor }]}>{text}</Light> :
          <Bold style={[styles.text, { color: textColor }]}>{text}</Bold>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#60E1E0',
    alignSelf: 'flex-start',
    padding: 10
  },
  text: {
    color: 'white',
    fontSize: isSmallDevice ? 12 : 15,
    marginLeft: 2
  }
});
