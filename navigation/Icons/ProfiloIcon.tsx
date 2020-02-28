import React from "react";
import { View, Image } from "react-native";

export default function ProfiloIcon(props) {
  return (
    <View>
      {props.focused ? (
        <Image
          source={require("../../assets/images/Profile_full.png")}
          style={{ width: 25, height: 25 }}
        ></Image>
      ) : (
        <Image
          source={require("../../assets/images/Profile_empty.png")}
          style={{ width: 25, height: 25 }}
        ></Image>
      )}
    </View>
  );
}
