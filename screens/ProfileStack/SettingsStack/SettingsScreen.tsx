import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import SettingsButton from "../../../shared/components/SerttingsButton";
import { Bold } from "../../../shared/components/StyledText";
import Colors from "../../../shared/constants/Colors";

export default function SettingsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>IMPOSTAZIONI ACCOUNT</Bold>
      <SettingsButton
        onPress={() => navigation.navigate("CambiaPassword")}
        text={"Cambia password"}
      />
      <SettingsButton
        onPress={() => navigation.navigate("CambiaPassword")}
        text={"Cambia e-mail"}
      />
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>INFO</Bold>
      <SettingsButton
        onPress={() => navigation.navigate("CambiaPassword")}
        text={"Privacy policy"}
      />
      <SettingsButton
        onPress={() => navigation.navigate("CambiaPassword")}
        text={"Riguardo Tendit"}
      />
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>ELIMINA ACCOUNT</Bold>
      <SettingsButton
        onPress={() => navigation.navigate("CambiaPassword")}
        text={"Elimina account"}
        color={Colors.red}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  spacer: {
    height: 25
  },
  sectionTitle: {
    color: "#5D5151",
    fontSize: 11,
    margin: 10,
    marginBottom: 15
  }
});
