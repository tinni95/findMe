import React, { FunctionComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Light, Bold, Body } from './StyledText';
import { width } from '../constants/Layout';

type RoundButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: any;
  color: string;
  bgColor?: string;
  isMedium?: Boolean;
  isLight?: Boolean;
  text: string;
  textColor: string;
};

const RoundButtonEmptyLarge: FunctionComponent<RoundButtonProps> = ({
  buttonStyle,
  onPress,
  bgColor,
  color,
  isMedium,
  isLight,
  text,
  textColor,
}) => (
  <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
    <View style={[styles.container, { borderColor: color, backgroundColor: bgColor || 'white' }]}>
      {isMedium ? (
        <Body style={[styles.text, { color: textColor }]}>{text}</Body>
      ) : isLight ? (
        <Light style={[styles.text, { color: textColor }]}>{text}</Light>
      ) : (
        <Bold style={[styles.text, { color: textColor }]}>{text}</Bold>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    alignSelf: 'flex-start',
    padding: 15,
    borderWidth: 1,
    width: width - 80,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginLeft: 2,
    textAlign: 'center',
  },
});

export default RoundButtonEmptyLarge;
