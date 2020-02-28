import React, { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Light } from "../components/StyledText";

type HeaderProps = {
  onPress?: any;
  text: string;
};

const HeaderRight: FunctionComponent<HeaderProps> = ({ text, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ paddingRight: 15, marginBottom: 2 }}
  >
    <Light style={{ fontSize: 15, color: Colors.red }}>{text}</Light>
  </TouchableOpacity>
);

export default HeaderRight;
