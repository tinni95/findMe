import React, { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Light, Body } from "./StyledText";


type HeaderProps = {
  navigation: any;
  text?: string;
  route?:AnalyserOptions;
};

const HeaderLeft: FunctionComponent<HeaderProps> = ({ navigation, route,text }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", padding:10 }}
    onPress={() => {
      navigation.goBack()}}
  >
    <Ionicons
      name={"ios-arrow-back"}
      size={25}
      style={{ marginLeft: 10, marginTop: 2.5 }}
      color={Colors.blue}
    ></Ionicons>
    <Body
      style={{

        color: Colors.blue,
        marginLeft: 20,
        alignSelf: "center",
        fontSize: 17
      }}
    >
      {text ? text : "Indietro"}
    </Body>
  </TouchableOpacity>
);

export default HeaderLeft;
