import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Light, Bold } from '../StyledText';
import { isSmallDevice } from '../../constants/Layout';

export default function RoundButtonEmpty2({ isLight, onPress, textColor, text, color, styleProps, style }) {
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
      <View style={[styles.container, styleProps, { borderColor: color }]}>
        {isLight ? <Light style={[styles.text, { color: textColor }]}>{text}</Light> :
          <Bold style={[styles.text, { color: textColor }]}>{text}</Bold>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: 10,
    borderWidth: 0.5
  },
  text: {
    color: 'white',
    fontSize: 13,
    marginLeft: 2
  }
});
