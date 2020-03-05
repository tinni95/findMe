import React, { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Light } from "./StyledText";
import { CompositeNavigationProp } from "@react-navigation/native";

type HeaderProps = {
  navigation: CompositeNavigationProp<any, any>;
  text?: string;
  route?:CompositeNavigationProp<any, any>;
};

const HeaderLeft: FunctionComponent<HeaderProps> = ({ navigation, route,text }) => (
  <TouchableOpacity
    style={{ flexDirection: "row" }}
    onPress={() => {route?.params?.onGoBack()
      navigation.goBack()}}
  >
    <Ionicons
      name={"ios-arrow-back"}
      size={25}
      style={{ marginLeft: 10, marginTop: 2.5 }}
      color={Colors.blue}
    ></Ionicons>
    <Light
      style={{
        color: Colors.blue,
        marginLeft: 20,
        alignSelf: "center",
        fontSize: 17
      }}
    >
      {text ? text : "Indietro"}
    </Light>
  </TouchableOpacity>
);

export default HeaderLeft;
