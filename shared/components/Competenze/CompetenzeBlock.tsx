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
        <View
          style={{
            marginBottom: 10
          }}
        >
          <Bold style={{ color: "black", fontSize: 18 }}>Competenze</Bold>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
            marginBottom: 20
          }}
        >
          <RoundButtonEmptyPenIcon
            isMedium
            onPress={onPress}
            color={Colors.blue}
            text={"Aggiungi"}
          ></RoundButtonEmptyPenIcon>
        </View>
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
        <UnTouchablePen size={15}></UnTouchablePen>
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
