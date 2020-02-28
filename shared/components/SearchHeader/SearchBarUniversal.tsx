import React from "react";
import { StyleSheet, View } from "react-native";
import SearchBarComponent from "./SearchBarComponent";

export default function SearchHeader({ setSearch }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBarComponent setIs={false} updateSearch={setSearch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: 0.3,
    flexDirection: "row"
  },
  bubbio: {
    flex: 2,
    height: 100,
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center"
  }
});
