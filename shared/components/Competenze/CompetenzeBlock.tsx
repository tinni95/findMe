import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import UnTouchablePen from "../UnTouchablePen";
import { Body, Bold } from "../StyledText";
import RoundButtonEmpty from "../RoundButtonEmpty";
import { RoundButtonEmptyPenIcon } from "../RoundButtonEmptyPenIcon";
var shortid = require("shortid");

export default function CompetenzeBlock({ competenze, onPress }) {
  if (competenze.length == 0) {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Bold style={{ color: "black", fontSize: 18 }}>Competenze</Bold>
          <UnTouchablePen size={40}></UnTouchablePen>
        </View>
        <View
          style={{
            height: 50
          }}
        ></View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Bold style={{ color: "black", fontSize: 18 }}>Competenze</Bold>
        <UnTouchablePen size={35}></UnTouchablePen>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
        {competenze.map(competenza => {
          return (
            <RoundButtonEmpty
              key={shortid.generate()}
              buttonStyle={{ margin: 5 }}
              isMedium={true}
              text={competenza}
              onPress={() => {}}
              color={Colors.blue}
            ></RoundButtonEmpty>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    borderRadius: 8
  }
});
