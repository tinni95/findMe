import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { FormStyles } from "./Form/FormStyles";
import { Bold, Body } from "./StyledText";
import { Ionicons } from "@expo/vector-icons";
import { wait } from "../functions/wait";
const shortid = require("shortid");

export function AutoCompleteFiltri({ navigation, route }) {
  let items = route.params?.items ?? "";
  let path = route.params?.path ?? "";
  let isFor = route.params?.for ?? "";
  let is = route.params?.is ?? "";
  const [text, setText] = useState("");
  const textInput = useRef<any>();
  let filteredItems = items.filter(item =>
    isFor != "Requisiti"
      ? item.titolo.toLowerCase().includes(text.toLowerCase())
      : item.toLowerCase().includes(text.toLowerCase())
  );
  if (is == "") {
    filteredItems = filteredItems.length == 0 ? [text] : filteredItems;
  }
  const renderItems = filteredItems.splice(0, 20).map(item => {
    let objectToPass =
      isFor == "Requisiti" || filteredItems[0] == text
        ? { title: item, for: isFor, is }
        : { title: item.titolo, categoria: item.categoria, for: isFor };

        useEffect(() => {
          wait(50).then(()=>{textInput.current.focus()});
        }, []);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(path, objectToPass)}
        key={shortid.generate()}
        style={styles.item}
      >
        <Ionicons
          name={"ios-search"}
          size={22}
          style={{ padding: 5 }}
          color={"#26547C"}
        />
        <Body style={styles.itemText}>
          {isFor == "Requisiti" || filteredItems[0] == text
            ? item
            : item.titolo}
        </Body>
      </TouchableOpacity>
    );
  });


  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          maxLength={40}
          style={[FormStyles.input, styles.input]}
          ref={textInput}
          onChangeText={text => setText(text)}
        />
        <TouchableOpacity
          style={styles.cancelContainer}
          onPress={() => navigation.goBack()}
        >
          <Bold style={styles.cancelButton}>Cancella</Bold>
        </TouchableOpacity>
      </View>
      <ScrollView
        onScrollBeginDrag={Keyboard.dismiss}
        style={{ marginTop: 25 }}
      >
        {renderItems}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 35,
    borderBottomColor: "#B19393"
  },
  textContainer: {
    flexDirection: "row"
  },
  input: {
    marginLeft: 15,
    marginRight: 5,
    borderBottomWidth: 0.3,
    color: "#5F5E5E",
    borderBottomColor: "#D3CFCF",
    flex: 4
  },
  cancelButton: { marginRight: 2.5, color: "#26547C" },
  cancelContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    marginLeft: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: "#D3CFCF",
    flexDirection: "row"
  },
  itemText: {
    color: "#26547C",
    margin: 5,
    marginBottom: 10,
    fontSize: 16
  }
});
