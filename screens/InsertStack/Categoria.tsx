import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { isBigDevice } from "../../shared/constants/Layout";
import HeaderBar from "../../shared/components/HeaderBar";
import HeaderTitle from "../../shared/components/HeaderTitle";
import CategoriaCard from "../../shared/components/CategoriaCard";
import {
  Salute,
  Informatica,
  Ristorazione,
  Privati,
  casa,
  aziendali,
  Feste,
  Consegne,
  lezioni
} from "../../shared/constants/Servizi";

export default function Categoria({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <HeaderBar
        onPress={() => navigation.navigate("ExploreScreen")}
      ></HeaderBar>
      <HeaderTitle text={"Categoria"}></HeaderTitle>
      <View style={styles.categoriaContent}>
        <View style={styles.categoriaRow}>
          <CategoriaCard
            title={"Salute e benessere"}
            onPress={() =>
              navigation.navigate("Posizione", { servizi: Salute })
            }
            image={require("../../assets/images/Settori/benessere.png")}
          ></CategoriaCard>
          <CategoriaCard
            title={"Informatica e servizi"}
            onPress={() =>
              navigation.navigate("Posizione", { servizi: Informatica })
            }
            image={require("../../assets/images/Settori/informatica.png")}
          ></CategoriaCard>
        </View>
        <View style={styles.categoriaRow}>
          <CategoriaCard
            title={"   Ristorazione   "}
            onPress={() =>
              navigation.navigate("Posizione", { servizi: Ristorazione })
            }
            image={require("../../assets/images/Settori/ristorazione.png")}
          ></CategoriaCard>
          <CategoriaCard
            title={"  Servizi per privati  "}
            onPress={() =>
              navigation.navigate("Posizione", { servizi: Privati })
            }
            image={require("../../assets/images/Settori/privati.png")}
          ></CategoriaCard>
        </View>
        <View style={styles.categoriaRow}>
          <CategoriaCard
            title={"Servizi per la casa"}
            onPress={() => navigation.navigate("Posizione", { servizi: casa })}
            image={require("../../assets/images/Settori/casa.png")}
          ></CategoriaCard>
          <CategoriaCard
            title={"Servizi per l'azienda"}
            onPress={() =>
              navigation.navigate("Posizione", { servizi: aziendali })
            }
            image={require("../../assets/images/Settori/azienda.png")}
          ></CategoriaCard>
        </View>
        <View style={styles.categoriaRow}>
          <CategoriaCard
            title={"Feste ed eventi"}
            onPress={() => navigation.navigate("Posizione", { servizi: Feste })}
            image={require("../../assets/images/Settori/feste.png")}
          ></CategoriaCard>
          <CategoriaCard
            title={"Consegne e logistica"}
            onPress={() =>
              navigation.navigate("Posizione", { servizi: Consegne })
            }
            image={require("../../assets/images/Settori/consegne.png")}
          ></CategoriaCard>
        </View>
        <View style={styles.categoriaRow}>
          <CategoriaCard
            onPress={() =>
              navigation.navigate("Posizione", { servizi: lezioni })
            }
            title={"Lezioni private"}
            image={require("../../assets/images/Settori/lezioni.png")}
          ></CategoriaCard>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoriaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 50
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
