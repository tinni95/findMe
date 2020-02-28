import React from "react";
import { View, StyleSheet } from "react-native";
import FormazioneCard from "./Formazioni/FormazioneCard";
import EsperienzaCard from "./Esperienze/EsperienzaCard";
import ProgettoCard from "./Progetti/ProgettoCard";
import { Body } from "./StyledText";
import Colors from "../constants/Colors";
var shortid = require("shortid");

export default function ItemsBlockVisit({ title, items }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10
        }}
      >
        <Body style={{ color: Colors.blue }}>{title}</Body>
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
          (title == "Formazione" &&
            items.map(item => {
              return <FormazioneCard key={shortid.generate()} item={item} />;
            })) ||
          (title == "Progetti" &&
            items.map(item => {
              return (
                <ProgettoCard
                  noBorder={false}
                  key={shortid.generate()}
                  item={item}
                />
              );
            })))}
    </View>
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
