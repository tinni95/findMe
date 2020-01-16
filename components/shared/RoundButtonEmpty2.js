import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Light, Bold, Body } from '../StyledText';
import { isSmallDevice } from '../../constants/Layout';

export default function RoundButtonEmpty2({ isLight, isMedium, onPress, textColor, text, color, buttonStyle, fontSize }) {
  return (
    <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
      <View style={[styles.container, buttonStyle, { borderColor: color }]}>
        {
          isMedium ? <Body style={[styles.text, { color: textColor, fontSize }]}>{text}</Body> :
            isLight ? <Light style={[styles.text, { color: textColor }]}>{text}</Light> :
              <Bold style={[styles.text, { color: textColor }]}>{text}</Bold>
        }
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
    borderWidth: 1
  },
  text: {
    color: 'white',
    fontSize: 11,
    marginLeft: 2
  }
});
