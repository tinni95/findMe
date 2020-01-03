import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Light, Bold, Body } from '../StyledText';
import { isSmallDevice, width } from '../../constants/Layout';

export default function RoundButtonEmptyLarge({ isLight, isMedium, onPress, textColor, text, color, buttonStyle }) {
  return (
    <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
      <View style={[styles.container, { borderColor: color }]}>
        {
          isMedium ? <Body style={[styles.text, { color: textColor }]}>{text}</Body> :
            isLight ? <Light style={[styles.text, { color: textColor }]}>{text}</Light> :
              <Bold style={[styles.text, { color: textColor }]}>{text}</Bold>
        }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: 15,
    borderWidth: 1,
    width: width - 80
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginLeft: 2,
    textAlign: "center"
  }
});
