import React from "react";
import { StyleSheet, TextInput, View, Settings } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Light } from "../StyledText";
import Colors from "../../constants/Colors";
import { useRef } from "react";

export default function SearchBarComponent({ setIs, updateSearch }) {
  const [search, setSearch] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const myref = useRef<any>();
  return (
    <View style={styles.outerWrapper}>
      <View style={styles.wrapper}>
        <Ionicons
          name={"ios-search"}
          size={23}
          style={{ marginRight: 10 }}
          color={"#BCBCBC"}
        />
        <TextInput
          style={styles.container}
          placeholder="Cerca parola chiave..."
          onChangeText={val => setSearch(val)}
          onFocus={() => {
            setIs(true);
            setFocused(true);
          }}
          onEndEditing={() => {
            setIs(false);
            setFocused(false);
          }}
          onSubmitEditing={() => {
            updateSearch(search);
          }}
          value={search}
          ref={myref}
        />
      </View>
      {focused ? (
        <TouchableOpacity
          onPress={() => {
            setIs(false);
            setFocused(false);
            myref.current.blur();
          }}
          style={styles.cancelWrapper}
        >
          <Light style={{ color: Colors.red }}>Cancel</Light>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    fontSize: 14,
    padding: 10,
    borderRadius: 5,
    flex: 8,
    marginTop: 35,
    marginLeft: 7.5,
    marginRight: 7.5,
    backgroundColor: "#F4F4F4"
  },
  outerWrapper: {
    flexDirection: "row",
    flex: 9
  },
  container: {
    fontSize: 14,
    flex: 1
  },
  cancelWrapper: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginRight: 5,
    marginTop: 35
  }
});
