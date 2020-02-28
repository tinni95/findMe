import React from "react";
import { Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Colors from "../constants/Colors";

export default function CreateButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../../assets/images/Pen_white.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35
  },
  container: {
    margin: 10,
    marginRight: 15,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: Colors.ocean,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
          width: 2,
          height: 5
        }
      },
      android: {
        elevation: 5
      }
    })
  }
});
