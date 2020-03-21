import React, { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Light, Body } from "../components/StyledText";

type HeaderProps = {
  onPress?: any;
  text: string;
};

const HeaderRight: FunctionComponent<HeaderProps> = ({ text, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ paddingRight: 15, marginBottom: 2 }}
  >
    <Body style={{ fontSize: 15, color: Colors.red }}>{text}</Body>
  </TouchableOpacity>
);

export default HeaderRight;
