import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../shared/constants/Colors";
let shortid = require("shortid");
import EsperienzaVisitCard from "../../../shared/components/Esperienze/EsperienzaVisitCard";

export default function EsperienzeVisitScreen({ navigation, route }) {
  const esperienze = route.params.esperienze;
  return (
    <View style={styles.container}>
      {esperienze.map(esperienza => {
        return (
          <EsperienzaVisitCard
            navigation={navigation}
            key={shortid.generate()}
            esperienza={esperienza}
          />
        );
      })}
    </View>
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
