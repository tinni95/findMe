import React, { FunctionComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Light, Bold, Body, Avenir } from './StyledText';
import Colors from '../constants/Colors';

type RoundButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: any;
  color: string;
  isAvenir?: Boolean;
  isMedium?: Boolean;
  isLight?: Boolean;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  textColor: string;
};

const RoundButton: FunctionComponent<RoundButtonProps> = ({
  buttonStyle,
  onPress,
  color,
  isMedium,
  isLight,
  isAvenir,
  text,
  textColor,
  textStyle,
}) => (
  <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
    <View style={[styles.container, { backgroundColor: color }]}>
      {isMedium ? (
        <Body style={[styles.text, textStyle, { color: textColor }]}>{text}</Body>
      ) : isLight ? (
        <Light style={[styles.text, textStyle, { color: textColor }]}>{text}</Light>
      ) : isAvenir ? (
        <Avenir style={[styles.text, textStyle, { color: textColor }]}>{text}</Avenir>
      ) : (
        <Bold style={[styles.text, textStyle, { color: textColor }]}>{text}</Bold>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: Colors.blue,
    alignSelf: 'flex-start',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 11,
    marginLeft: 2,
  },
});

export default RoundButton;
