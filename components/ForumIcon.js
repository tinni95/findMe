import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image } from "react-native"
import { Body } from "./StyledText";
import Colors from "../constants/Colors";


export default function ForumIcon(props) {

  return (
    <View>
      {props.focused ?
        <Image source={require("../assets/images/glimm_logo.png")} style={{ width: 25, height: 25 }}></Image> :
        <Image source={require("../assets/images/glimm_logo_empty.png")} style={{ width: 25, height: 25 }}></Image>
      }
    </View>
  );
}

