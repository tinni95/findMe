import React from "react";
import { View, StyleSheet } from "react-native";
import { Light, Bold } from "../StyledText";
import * as WebBrowser from "expo-web-browser";
import Colors from "../../constants/Colors";
import ProgettoCard from "./ProgettoCard";
import { adjustLink } from "../../functions/adjustLink";

export default function ProgettoVisitCard({ progetto, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ProgettoCard
          noBorder={{ borderBottomColor: "white" }}
          item={progetto}
        ></ProgettoCard>
        <View style={styles.textContainer}>
          <Light>{progetto.descrizione}</Light>
        </View>
        {progetto.link && progetto.link.length > 0 && (
          <View style={{ marginTop: 10, marginLeft: 6 }}>
            <Bold
              onPress={() =>
                WebBrowser.openBrowserAsync(adjustLink(progetto.link))
              }
              style={styles.link}
            >
              LINK
            </Bold>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#F2F2F2",
    borderTopWidth: 5
  },
  touchablePenContainer: {
    alignItems: "flex-end"
  },
  innerContainer: {
    margin: 15,
    marginTop: 0
  },
  textContainer: {
    margin: 15,
    marginTop: 20,
    marginLeft: 6
  },
  link: {
    color: Colors.blue,
    fontSize: 12
  }
});
