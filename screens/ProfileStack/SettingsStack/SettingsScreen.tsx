import React from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import SettingsButton from "../../../shared/components/SettingsButton";
import { Bold } from "../../../shared/components/StyledText";
import Colors from "../../../shared/constants/Colors";
import LoginContext from "../../../shared/LoginContext";

function SettingsScreen({ navigation, context }) {
  const deleteAccount = () => {
    // Works on both Android and iOS
    Alert.alert(
      "Sei sicuro?",
      "sicuro che vuoi eliminare il tuo account?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            context.logout();
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>IMPOSTAZIONI ACCOUNT</Bold>
      <SettingsButton
        onPress={() => navigation.navigate("UpdatePassword")}
        text={"Cambia password"}
      />
      <SettingsButton
        onPress={() => navigation.navigate("UpdateEmail")}
        text={"Cambia e-mail"}
      />
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>INFO</Bold>
      <SettingsButton
        onPress={() => navigation.navigate("CambiaPassword")}
        text={"Privacy policy"}
      />
      <SettingsButton
        onPress={() => navigation.navigate("About")}
        text={"Riguardo Tendit"}
      />
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>ELIMINA ACCOUNT</Bold>
      <SettingsButton
        onPress={() => () => deleteAccount()}
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

const SettingsScreenWC = props => {
  return (
    <LoginContext.Consumer>
      {context => <SettingsScreen {...props} context={context} />}
    </LoginContext.Consumer>
  );
};

export default SettingsScreenWC;
