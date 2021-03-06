import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MultiFilters from "../../../shared/components/Filters/MultiFilter";
import { Settori } from "../../../shared/constants/Settori";
import {
  StepsLabel,
  StepsLabelWithHint
} from "../../../shared/components/StepsLabel";
import { Bold, Body } from "../../../shared/components/StyledText";
import { FormStyles } from "../../../shared/components/Form/FormStyles";
import { Comuni } from "../../../shared/constants/Comuni";
import HeaderRight from "../../../shared/components/HeaderRight";
import RoundButton from "../../../shared/components/RoundButton";
import Colors from "../../../shared/constants/Colors";
import HeaderLeft from "../../../shared/components/HeaderLeftWithRoute";

export default function FiltersPage({ navigation }) {
  console.log(navigation.state.params)
  const [reset, setReset] = useState(false);
  let settore = navigation.getParam("settore",[]) || [];
  const [settori, setSettori] = useState(settore);
  const [regione, setRegione] = useState(navigation.getParam("regione",null));
  const [provincia, setProvincia] = useState(navigation.getParam("provincia",null));
  const [comune, setComune] = useState(navigation.getParam("comune",null));

  const azzeraFiltri = async () => {
    await setReset(true);
    setSettori([]);
    setReset(false);
    await setRegione(null);
    await setProvincia(null);
    await setComune(null);
  };

  useEffect(() => {
    navigation.setParams({ azzera:azzeraFiltri });
  }, []);
  

  var regioneArray = Comuni.map(comune => {
    return comune.regione;
  });
  var regioni = [...new Set(regioneArray)];
  const removeUndefined = list => {
    return list.filter(i => i != undefined);
  };

  const provincie = regione => {
    var provinciaArray = Comuni.map(comune => {
      if (comune.regione == regione) {
        return comune.provincia;
      }
    });
    return removeUndefined([...new Set(provinciaArray)]);
  };

  const comunis = provincia => {
    var comuniArray = Comuni.map(comune => {
      if (comune.provincia == provincia) {
        return comune.città;
      }
    });
    return removeUndefined([...new Set(comuniArray)]);
  };

  const is =navigation.getParam("is","");
  const passedItem = navigation.getParam("title",null);
  useEffect(() => {
    if (passedItem) {
      if (is == "regione") {
        setRegione(passedItem);
      }
      if (is == "provincia") {
        setProvincia(passedItem);
      }
      if (is == "comune") {
        setComune(passedItem);
      }
    }
  }, [passedItem]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <StepsLabelWithHint
          tooltipText={
            "scegli i settori a cui sei interessato come posizione, puoi sceglierne quanti ne vuoi"
          }
          text={"Settori di preferenza"}
        ></StepsLabelWithHint>
        <MultiFilters
          reset={reset}
          hide
          addItem={item => setSettori([...settori, item])}
          removeItem={item => setSettori(settori.filter(i => i !== item))}
          settori={Settori}
          settoreAttivi={settore}
        />
        <StepsLabel text={"Regione"}></StepsLabel>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AutoComplete", {
              is: "regione",
              for: "Requisiti",
              path: "FiltersPage",
              items: regioni
            })
          }
          style={FormStyles.requisiti}
        >
          <Body
            style={[
              {
                color: !regione ? "#958C8C" : "black",
                fontSize: 12,
                marginTop: 2.5
              }
            ]}
          >
            {!regione ? "Cerca Regione" : regione}
          </Body>
        </TouchableOpacity>
        <StepsLabel text={"Provincia"}></StepsLabel>
        <TouchableOpacity
          onPress={() =>
            regione &&
            navigation.navigate("AutoComplete", {
              is: "provincia",
              for: "Requisiti",
              path: "FiltersPage",
              items: provincie(regione)
            })
          }
          style={FormStyles.requisiti}
        >
          <Body
            style={{
              opacity: regione ? 1 : 0.2,
              color: !provincia ? "#958C8C" : "black",
              fontSize: 12,
              marginTop: 2.5
            }}
          >
            {!provincia ? "Cerca Provincia" : provincia}
          </Body>
        </TouchableOpacity>
        <StepsLabel text={"Comune"}></StepsLabel>
        <TouchableOpacity
          onPress={() =>
            provincia &&
            navigation.navigate("AutoComplete", {
              is: "comune",
              for: "Requisiti",
              path: "FiltersPage",
              items: comunis(provincia)
            })
          }
          style={FormStyles.requisiti}
        >
          <Body
            style={{
              fontSize: 12,
              marginTop: 2.5,
              opacity: provincia ? 1 : 0.2,
              color: !comune ? "#958C8C" : "black"
            }}
          >
            {!comune ? "Cerca Comune" : comune}
          </Body>
        </TouchableOpacity>
        <View style={styles.buttonWrapper}>
          <RoundButton
            onPress={() => {
              navigation.navigate("Explore", {
               regione, settori, provincia, comune 
              });
            }}
            color={Colors.blue}
            textColor={"white"}
            text={" Applica "}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: "white"
  },
  buttonWrapper: {
    margin: 20,
    marginTop: 40,
    alignSelf: "center"
  },
  locationInput: {
    width: "100%"
  }
});

FiltersPage.navigationOptions = ({ navigation }) => {
  return {
    title:null,
    headerLeft: <HeaderLeft onPress={()=>navigation.navigate("Explore",navigation.state.params)}></HeaderLeft>,
    headerRight: () => <HeaderRight text={"Azzera Filtri"} onPress={() => navigation.getParam("azzera",null)()} />
  }
}