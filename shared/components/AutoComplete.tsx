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
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

const shortid = require("shortid");

function AutoComplete({ navigation, route }) {
  let{items, path, isFor} = navigation.state.params;
  const [text, setText] = useState("");
  const passwordInput = useRef<any>();
  let filteredItems = items.filter(item =>
    isFor != "Requisiti"
      ? item.titolo.toLowerCase().includes(text.toLowerCase())
      : item.toLowerCase().includes(text.toLowerCase())
  );
  filteredItems = filteredItems.length == 0 ? [text] : filteredItems;

  const renderItems = filteredItems.map(item => {
    let objectToPass =
      isFor == "Requisiti" || filteredItems[0] == text
        ? { title: item, for: isFor }
        : { title: item.titolo, categoria: item.categoria, for: isFor };
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PosizioniModal", {
            screen: "Posizioni",
            params: { porco: "cazzo" }
          });
        }}
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
        <LinearGradient start={[0, 1]} end={[1, 0]} colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
      </TouchableOpacity>
    );
  });

  useEffect(() => {
    wait(50).then(()=>{passwordInput.current.focus()});
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          autoCorrect={false}
          maxLength={40}
          style={[FormStyles.input, styles.input]}
          ref={passwordInput}
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
    paddingTop: 40,
  },
  textContainer: {
    flexDirection: "row"
  },
  input: {
    marginLeft: 15,
    marginRight: 5,
    flex: 4
  },
  line:{
    height:1.5,
  },
  cancelButton: { marginRight: 2.5, color: "#26547C" },
  cancelContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    marginTop:5,
    marginLeft: 15,
  },
  itemText: {
    color: Colors.black,
    margin: 10,
    marginBottom: 5,
    fontSize: 16
  }
});

export default AutoComplete;
