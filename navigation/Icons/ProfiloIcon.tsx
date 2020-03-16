import React from "react";
import { View, Image } from "react-native";
import { Body } from "../../shared/components/StyledText";
import Colors from "../../shared/constants/Colors";

export default function ProfiloIcon(props) {
  return (
    <View style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
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
      <Body
        style={{
          fontSize: 8,
          textAlign: "center",
          marginTop: 3,
          color: props.focused ? Colors.blue : "black",
          marginRight: 2
        }}
      >
        Profilo
      </Body>
    </View>
  );
}
