import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../shared/constants/Colors";
import Aggiungi from "../../../shared/components/Aggiungi";
let shortid = require("shortid");
import EsperienzaEditCard from "../../../shared/components/Esperienze/EsperienzaEditCard";

export default function EsperienzeScreen({ navigation, route }) {
  const esperienze = route.params.esperienze;
  return (
    <View style={styles.container}>
      <Aggiungi
        onPress={() => navigation.navigate("EsperienzeEditScreen")}
        text={"Esperienza"}
      />
      {esperienze.map(esperienza => {
        return (
          <EsperienzaEditCard
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
