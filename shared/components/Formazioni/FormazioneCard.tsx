import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Body, Bold } from "../StyledText";

export default function FormazioneCard({
  item: { corso, dataInizio, dataFine, istituto },
  noBorder
}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ height: 20, width: 20 }}
          resizeMode={"contain"}
          source={require("../../../assets/images/hat.png")}
        ></Image>
      </View>
      <View style={[styles.textContainer, noBorder]}>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Body style={styles.textHeader}>{corso}</Body>
            <Body style={styles.textDate}>
              {dataInizio}- {dataFine}
            </Body>
          </View>
          <Bold style={styles.textSubHeader}>{istituto}</Bold>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 12
  },
  textDate: {
    fontSize: 10
  },
  textSubHeader: {
    fontSize: 10,
    color: "#958C8C",
    marginTop: 5
  },
  container: {
    flexDirection: "row",
    margin: 5,
    marginTop: 20
  },
  imageContainer: {
    flex: 0.18,
    alignContent: "center",
    marginTop: 5
  },
  textContainer: {
    flex: 1,
    paddingBottom: 15
  }
});
