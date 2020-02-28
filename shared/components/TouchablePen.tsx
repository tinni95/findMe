import React from "react";
import { TouchableOpacity, Image } from "react-native";

export default function TouchablePen(props) {
  return (
    <TouchableOpacity style={{ flexDirection: "row" }} onPress={props.onPress}>
      {props.children}
      <Image
        source={require("../../assets/images/pen.png")}
        style={[
          { width: props.size, height: props.size, marginRight: 15 },
          props.penStyle
        ]}
      />
    </TouchableOpacity>
  );
}
