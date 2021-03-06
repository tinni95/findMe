import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FormazioneCard from "./Formazioni/FormazioneCard";
import EsperienzaCard from "./Esperienze/EsperienzaCard";
import ProgettoCard from "./Progetti/ProgettoCard";
import { Body, Bold } from "./StyledText";
import Colors from "../constants/Colors";
var shortid = require("shortid");

export default function ItemsBlockVisit({ onPress, title, items }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        borderRadius: 8,
        width: "100%"
      }}
      onPress={onPress}
    >
      <View
        style={{
          marginBottom: 10
        }}
      >
        <Bold style={{ color: "black", fontSize: 18 }}>{title}</Bold>
      </View>

      {items.length > 0 &&
        ((title == "Esperienze" &&
          items.map(item => {
            return (
              <EsperienzaCard
                noBorder={false}
                key={shortid.generate()}
                item={item}
              />
            );
          })) ||
          (title == "Formazioni" &&
            items.map(item => {
              return <FormazioneCard key={shortid.generate()} item={item} />;
            })))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  aggiungiButton: {
    textAlign: "center",
    color: Colors.blue
  },
  aggiungiWrapper: {
    margin: 20
  }
});
