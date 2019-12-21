import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Light, Bold, Body } from '../StyledText';
import { isSmallDevice } from '../../constants/Layout';

export default function RoundButton({ isLight, isMedium, onPress, textColor, text, color, styleProps, style }) {
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
      <View style={[styles.container, styleProps, { backgroundColor: color }]}>
        {isMedium ? <Body style={[styles.text, { color: textColor }]}>{text}</Body> :
          isLight ? <Light style={[styles.text, { color: textColor }]}>{text}</Light> :
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
    fontSize: 11,
    marginLeft: 2
  }
});
