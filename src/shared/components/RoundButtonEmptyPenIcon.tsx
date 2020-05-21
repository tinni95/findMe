import React, { FunctionComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Light, Bold, Body } from './StyledText';
import UnTouchablePen from './UnTouchablePen';

type RoundButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: any;
  color: string;
  isMedium?: Boolean;
  isLight?: Boolean;
  text: string;
};

export const RoundButtonEmptyPenIcon: FunctionComponent<RoundButtonProps> = ({
  buttonStyle,
  onPress,
  color,
  isMedium,
  isLight,
  text,
}) => {
  return (
    <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
      <View style={[styles.container, { borderColor: color }]}>
        <UnTouchablePen size={15} />
        {isMedium ? (
          <Body style={[styles.text, { color }]}>{text}</Body>
        ) : isLight ? (
          <Light style={[styles.text, { color }]}>{text}</Light>
        ) : (
          <Bold style={[styles.text, { color }]}>{text}</Bold>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    alignItems: 'center',
    padding: 7,
    paddingLeft: 13,
    paddingRight: 13,
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 11,
    marginLeft: 2,
  },
});
