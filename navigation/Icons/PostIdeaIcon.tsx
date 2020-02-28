import React from "react";
import { View, Image } from "react-native";

export default function PostIdeaIcon(props) {
  return (
    <View>
      {props.focused ? (
        <Image
          source={require("../../assets/images/PostIdea_Full.png")}
          style={{ width: 17.5, height: 25 }}
        ></Image>
      ) : (
        <Image
          source={require("../../assets/images/PostIdea_empty.png")}
          style={{ width: 17.5, height: 25 }}
        ></Image>
      )}
    </View>
  );
}
