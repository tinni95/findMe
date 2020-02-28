import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from "react-native";
import { Light, Bold, Body } from "./StyledText";

type RoundButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: any;
  color: string;
  isMedium?: Boolean;
  isLight?: Boolean;
  text: string;
  textColor: string;
};

const RoundButton: FunctionComponent<RoundButtonProps> = ({
  buttonStyle,
  onPress,
  color,
  isMedium,
  isLight,
  text,
  textColor
}) => (
  <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
    <View style={[styles.container, { backgroundColor: color }]}>
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
    borderRadius: 20,
    backgroundColor: "#60E1E0",
    alignSelf: "flex-start",
    padding: 10
  },
  text: {
    color: "white",
    fontSize: 11,
    marginLeft: 2
  }
});

export default RoundButton;
