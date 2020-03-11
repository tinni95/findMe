import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { isBigDevice } from "../../shared/constants/Layout";
import HeaderBarLeft from "../../shared/components/HeaderBarLeft";
import HeaderTitle from "../../shared/components/HeaderTitle";
import ServizioCard from "../../shared/components/ServizioCard";

export default function Posizione({ navigation, route }) {
  const servizi = route.params?.servizi
  const servizio= () => {
    var i;
    for ( i = 0; i < servizi.length; i++) {
      console.log(servizi.length)
      return(
        <View style={styles.categoriaRow}>
        <ServizioCard
          title={servizi[i]}
        ></ServizioCard>
       { servizi[i+1] &&
        <ServizioCard
          title={servizi[i+1]}
        ></ServizioCard>}
      </View>)
    }
  }
  return (
    <ScrollView style={styles.container}>
      <HeaderBarLeft
        onPress={() => navigation.navigate("Categoria")}
      ></HeaderBarLeft>
      <HeaderTitle text={"Servizio"}></HeaderTitle>
      <View style={styles.posizioneContent}>
      <View style={styles.categoriaRow}>
        {servizi.map(servizio=>{
            return <ServizioCard
            title={servizio}
          ></ServizioCard>
        })}
      </View>
      </View>
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
