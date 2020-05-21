import React, { FunctionComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Light, Bold, Body } from './StyledText';

type RoundButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: any;
  color: string;
  isMedium?: Boolean;
  isLight?: Boolean;
  text: string;
};

const RoundButtonEmpty: FunctionComponent<RoundButtonProps> = ({
  buttonStyle,
  onPress,
  color,
  isMedium,
  isLight,
  text,
}) => (
  <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
    <View style={[styles.container, { borderColor: color }]}>
      {isMedium ? (
        <Body style={[styles.text, { color: color }]}>{text}</Body>
      ) : isLight ? (
        <Light style={[styles.text, { color: color }]}>{text}</Light>
      ) : (
        <Bold style={[styles.text, { color: color }]}>{text}</Bold>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderColor: '#60E1E0',
    borderWidth: 0.5,
    alignSelf: 'flex-start',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 11,
    marginLeft: 2,
  },
});

export default RoundButtonEmpty;
