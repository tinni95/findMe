import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  TextInput,
  Keyboard,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { FormStyles } from "./Form/FormStyles";
import { Body, Bold } from "./StyledText";
import { Comuni } from "../constants/Comuni";
import Colors from "../constants/Colors";
import { wait } from "../functions/wait";
const shortid = require("shortid");

function AutoCompleteLocation({ navigation, route }) {
  let path = route.params?.path;
  const [text, setText] = useState("null");
  navigation.setOptions({ title: "" });
  const Input = useRef<any>();
  let filteredComuni = Comuni.filter(comune =>
    comune.città.toLowerCase().includes(text.toLowerCase())
  ).slice(0, 25);
  const renderItems = filteredComuni.map(item => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(path, {
            comune: item.città,
            regione: item.regione,
            provincia: item.provincia
          })
        }
        key={shortid.generate()}
        style={styles.item}
      >
        <Body style={styles.itemText}>
          {item.città + ", " + item.provincia + ", " + item.regione}
        </Body>
      </TouchableOpacity>
    );
  });

  useEffect(() => {
    wait(50).then(()=>{Input.current.focus()});
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          autoCorrect={false}
          style={[FormStyles.input, styles.input]}
          ref={Input}
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
        style={{ paddingTop: 25 }}
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
    borderBottomColor: "#B19393"
  },
  textContainer: {
    flexDirection: "row"
  },
  input: {
    marginLeft: 15,
    marginRight: 5,
    borderBottomColor: "#B19393",
    flex: 4
  },
  cancelButton: {
    marginRight: 2.5,
    color: Colors.blue
  },
  cancelContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#B19393"
  },
  itemText: {
    color: "#26547C",
    margin: 5,
    marginBottom: 10,
    fontSize: 16
  }
});

export default AutoCompleteLocation;
