import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Colors from "../../../shared/constants/Colors";

let shortid = require("shortid");
import FormazioneVisitCard from "../../../shared/components/Formazioni/FormazioneVisitCard";

export default function FormazioniVisitScreen({ navigation, route }) {
  const formazioni =navigation.getParam("formazioni",null)

  return (
    <ScrollView style={styles.container}>
      {formazioni.map(formazione => {
        return (
          <FormazioneVisitCard
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
