import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import UnTouchablePen from "../UnTouchablePen";
import { Body, Bold, Light } from "../StyledText";
import { RoundButtonEmptyPenIcon } from "../RoundButtonEmptyPenIcon";

export default function BioBlock({ bio, onPress }) {
  const [showAll, setShowAll] = useState(false);
  if (!bio) {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Bold style={{ color: "black", fontSize: 18 }}>Chi sono</Bold>
        </View>
        <View style={{ height: 50 }}></View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Bold style={{ color: "black", fontSize: 18 }}>Chi sono</Bold>
        <UnTouchablePen size={40}></UnTouchablePen>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 20
        }}
      >
        <View style={styles.bio}>
          {bio.length < 150 || showAll ? (
            <Body style={{ textAlign: "left" }}>{bio}</Body>
          ) : (
            <Text style={{ textAlign: "left" }}>
              <Body>{bio.slice(0, 150)}</Body>
              <Bold onPress={() => setShowAll(true)}> ...Altro</Bold>
            </Text>
          )}
        </View>
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
    marginBottom: 5,
    borderRadius: 8
  },
  bio: {
    paddingBottom: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});
