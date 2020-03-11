import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { isBigDevice } from "../../shared/constants/Layout";
import HeaderBarLeft from "../../shared/components/HeaderBarLeft";
import HeaderTitle from "../../shared/components/HeaderTitle";
import ServizioCard from "../../shared/components/ServizioCard";
import RequisitiMultiSelect from "../../shared/components/RequisitiMultiSelect";
import RequisitiPicker from "../../shared/components/RequisitiPicker";

export default function Requisiti({ navigation, route }) {
  const requisiti = route.params?.requisiti
  const [active, setActive] = useState<any>([]);
  const [custom, setCustom] = useState<any>([]);
console.log(requisiti)
  return (
    <ScrollView style={styles.container}>
      <HeaderBarLeft
        onPress={() => navigation.navigate("Posizione")}
      ></HeaderBarLeft>
      <HeaderTitle text={"Requisiti"}></HeaderTitle>
      <RequisitiMultiSelect active={active} setActive={setActive} items={requisiti}></RequisitiMultiSelect>
      <TouchableOpacity>
      <RequisitiPicker selected={false} text={"Personalizza"}></RequisitiPicker>
      </TouchableOpacity>
      <View style={{height:100}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  posizioneContent:{
    padding:20
  },
  categoriaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 50,
    flexWrap: 'wrap'
  },
  categoriaContent: {
    padding: 40
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    margin: 28,
    marginTop: 40,
    marginBottom: 40
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "flex-start"
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 40
  },
  body: {
    flex: 8,
    marginLeft: isBigDevice ? 100 : 20,
    marginRight: isBigDevice ? 100 : 20
  },
  header: {
    flex: 1,
    paddingBottom: 15
  },
  textHeading: {
    marginLeft: 5,
    marginBottom: 15,
    marginTop: 25,
    color: "#5F5E5E"
  }
});
