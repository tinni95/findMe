import React from "react";
import RoundButton from "./RoundButton";
import { View } from "react-native";
import Colors from "../constants/Colors";

const ZoomButton = ({ onPress }) => {
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <RoundButton
        onPress={onPress}
        color={Colors.red}
        text={"VAI"}
        textColor={"white"}
      />
    </View>
  );
};

export default ZoomButton;
