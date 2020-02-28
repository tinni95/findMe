import React from "react";
import { View } from "react-native";
import { Body } from "./StyledText";
import RoundButtonEmpty from "./RoundButtonEmpty";
import Colors from "../constants/Colors";

var shortid = require("shortid");

export default function CompetenzeBlockVisit({ competenze, onPress }) {
  return (
    <View>
      <View>
        <Body style={{ color: Colors.blue }}>Competenze</Body>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
        {competenze.map(competenza => {
          return (
            <RoundButtonEmpty
              onPress={onPress}
              key={shortid.generate()}
              buttonStyle={{ margin: 5 }}
              isLight={true}
              text={competenza}
              color={Colors.blue}
            ></RoundButtonEmpty>
          );
        })}
      </View>
    </View>
  );
}
