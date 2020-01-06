import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Light, Bold, Body } from '../StyledText';
import { Ionicons } from '@expo/vector-icons';

export default function RoundButtonEmptyIcon({ isLight, isMedium, onPress, textColor, text, color, buttonStyle, iconName, iconColor }) {
  return (
    <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
      <View style={[styles.container, { borderColor: color }]}>
        <Ionicons
          name={iconName}
          color={iconColor}
          size={22}
          style={{ marginRight: 10 }} />
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
    borderRadius: 15,
    backgroundColor: 'white',
    alignSelf: "flex-start",
    alignItems: "center",
    padding: 3,
    paddingLeft: 13,
    paddingRight: 13,
    borderWidth: 1,
    flexDirection: "row"
  },
  text: {
    color: 'white',
    fontSize: 11,
    marginLeft: 2
  }
});
