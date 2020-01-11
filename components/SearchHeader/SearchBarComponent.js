import React from 'react';
import { StyleSheet, TextInput, View, Settings } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SearchBarComponent({ navigation, setIs }) {

  const [search, setSearch] = useState("")

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
          onChangeText={(val) => setSearch(val)}
          onFocus={() => setIs(true)}
          onEndEditing={() => setIs(false)}
          value={search}
        />
      </View>
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
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#F4F4F4",
  },
  outerWrapper: {
    flexDirection: "row"
  },
  container: {
    fontSize: 14,
    flex: 1
  }
});

