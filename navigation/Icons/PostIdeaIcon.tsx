import React from "react";
import { View, Image } from "react-native";
import { Body } from "../../shared/components/StyledText";
import Colors from "../../shared/constants/Colors";

export default function PostIdeaIcon(props) {
  return (
    <View>
      {props.focused ? (
        <View
          style={{ width: 50, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/images/PostIdea_Full.png")}
            style={{ width: 17.5, height: 25 }}
          ></Image>
          <Body
            style={{
              fontSize: 8,
              textAlign: "center",
              marginTop: 3,
              marginRight: 2,
              color: Colors.blue
            }}
          >
            Servizi
          </Body>
        </View>
      ) : (
        <View
          style={{ width: 50, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/images/PostIdea_empty.png")}
            style={{ width: 17.5, height: 25 }}
          ></Image>
          <Body
            style={{
              fontSize: 8,
              textAlign: "center",
              marginTop: 3,
              marginRight: 2
            }}
          >
            Servizi
          </Body>
        </View>
      )}
    </View>
  );
}
