import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Colors from "../../../shared/constants/Colors";
import Aggiungi from "../../../shared/components/Aggiungi";

let shortid = require("shortid");
import FormazioneEditCard from "../../../shared/components/Formazioni/FormazioneEditCard";

export default function FormazioniScreen({ navigation, route }) {
  const formazioni = route.params.formazioni;
  return (
    <ScrollView style={styles.container}>
      <Aggiungi
        onPress={() => navigation.navigate("FormazioneEditScreen")}
        text={"FORMAZIONE"}
      />
      {formazioni.map(formazione => {
        return (
          <FormazioneEditCard
            navigation={navigation}
            key={shortid.generate()}
            formazione={formazione}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  aggiungiWrapper: {
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#707070",
    borderBottomWidth: 0.3
  },
  aggiungiText: {
    color: Colors.blue,
    fontSize: 12
  }
});
