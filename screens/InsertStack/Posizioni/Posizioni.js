import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import StepsLabel from "../../shared/StepsLabel";
import { AddButton } from "../shared/AddButton";
import WithErrorString from "../../shared/Form/WithErrorString";
import { StepsIndicator } from "../shared/stepsIndicator";
import FormTextInput from "../../shared/Form/FormTextInput";
import RoundFiltersOne from "../../Explore/FiltersStack/components/RoundFiltersOne";
import RoundButton from '../../../components/shared/RoundButton';
import RoundButtonEmptyUniversal from '../../../components/shared/RoundButtonEmptyUniversal';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FormStyles } from "../../shared/Form/FormStyles";
import { Settori, TipoSocio, TitoliPosizioni, Requisiti } from "../shared/helpers";
import { isBigDevice } from '../../../constants/Layout';
import { Light } from "../../../components/StyledText";
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import HeaderBar from '../shared/HeaderBar';

var shortid = require("shortid")
const POST_POSIZIONI = gql`
  query PosizioniQuery {
    postPositions @client{
      field
      type
      description
      title
    }
    postProvincia @client
    postTitle @client
  }
`;

export default function Posizioni({ navigation, settore }) {
  //Hooks
  const [zoom, setZoom] = useState(false)
  const [active, setActive] = useState("");
  const [title, setTitle] = useState("");
  const [socio, setSocio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [requisiti, setRequisiti] = useState([]);
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [socioError, setSocioError] = useState(false);
  const [posizioniError, setPosizioniError] = useState(false);
  const [categoriaError, setCategoriaError] = useState(false);
  //Data
  const { data } = useQuery(POST_POSIZIONI);
  const posizioni = data.postPositions || [];
  let passedCategoria = navigation.getParam("for") == "Titoli" ? navigation.getParam("categoria") || null : null
  let passedTitle = navigation.getParam("for") == "Titoli" ? navigation.getParam("title") || null : null
  let passedRequisito = navigation.getParam("for") == "Requisiti" ? navigation.getParam("title") || null : null
  let passedSettore = navigation.getParam("settore") || null
  let passedCategoriaIndex = Settori.indexOf(passedCategoria);
  //if first page data is missing, we go back to it
  useEffect(() => {
    if (data.postProvincia === "") {
      navigation.navigate("Presentazione")
    }
    else if (data.postTitle === "") {
      navigation.navigate("Descrizione")
    }
  }, [])

  //Autocomplete categoria
  useEffect(() => {
    passedCategoria ? setCategoria(passedCategoria) : null
  }, [passedCategoria])
  //Autocomplete titolo
  useEffect(() => {
    passedTitle ? setTitle(passedTitle) : null
  }, [passedTitle])
  //Autocomplete requisiti
  useEffect(() => {
    passedRequisito ?
      requisiti.includes(passedRequisito.trim()) ? null : setRequisiti([...requisiti, passedRequisito])
      : null
  }, [passedRequisito])
  //reset when added a position
  useEffect(() => {
    resetState();
  }, [passedSettore])

  const refreshSettore = () => {
    passedCategoriaIndex = Settori.indexOf(categoria);
    passedSettore = TipoSocio.indexOf(socio)
  }

  const resetState = () => {
    passedTitle = null
    passedCategoria = null
    setTitle("");
    setDescription("");
    setSocio("");
    setCategoria("");
    setRequisiti([]);
  }

  const handleAggiungi = (bool) => {
    if (categoria.length === 0 && !bool) {
      setCategoriaError(true)
    } else {
      setCategoriaError(false)
    }
    if (socio.length === 0) {
      setSocioError(true)
    } else {
      setSocioError(false)
    }
    if (title.length === 0 && !bool) {
      setTitleError(true)
    } else {
      setTitleError(false)
    }

    if (((categoria.length > 0 && socio.length > 0 && title.length > 0) || bool)) {
      navigation.navigate("ConfermaPosizione", {
        description,
        categoria,
        socio,
        title,
        requisiti
      });
    }
  }

  const buttons = (bool) => {
    return (
      <View>
        <View style={styles.aggiungiWrapper}>
          {posizioni.length == 0 ?
            <StepsLabel error={posizioniError} text="Aggiungi Una Posizione" />
            :
            <View style={{ flexDirection: "row" }}>
              <StepsLabel text={`Hai Aggiunto`} />
              <StepsLabel style={styles.link} text={posizioni.length + (posizioni.length == 1 ? ` posizione` : ` posizioni`)} onPress={() => navigation.navigate("ModificaPosizioni")} />
            </View>}
          <AddButton onPress={() => handleAggiungi(bool)} text={"+ Aggiungi Posizione"} />
        </View>
        <View style={styles.buttonWrapper}>
          <RoundButtonEmptyUniversal text={"INDIETRO"} color={"#10476C"} onPress={() => navigation.navigate("Descrizione")} />
          <RoundButton text={"  AVANTI  "} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
        </View>
      </View>)
  }

  const requirements = () => {
    return requisiti.map((requisito, index) => {
      let isActive = active === index
      return <View key={shortid.generate()} style={{ margin: 5, flexDirection: "row" }}>
        <RoundButton
          onPress={() => {
            if (isActive) {
              let newRequisiti = requisiti.filter(el => el != requisiti[index])
              setRequisiti(newRequisiti)
              setActive(-1)
            }
            else {
              setActive(index);
            }
          }}
          isLight={true} text={requisito} textColor={"white"} color={isActive ? "#DD1E63" : "#26547C"}></RoundButton>
        {isActive ?
          <Ionicons
            name={"ios-close"}
            size={30}
            color={"#989090"}
            style={{ marginTop: -10, padding: 5 }}
          /> : null}</View>
    })
  }

  const handlePress = () => {
    if (posizioni.length < 1) {
      setPosizioniError(true)
    } else {
      setPosizioniError(false)
    }
    if (posizioni.length > 0) {
      navigation.navigate("Anteprima");
    }
  }

  return (
    <View style={styles.container}>
      <HeaderBar onPress={() => navigation.navigate("Explore")}></HeaderBar>
      <View style={styles.header}>
        <StepsIndicator navigation={navigation} active={2}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!zoom &&
            <View>
              {refreshSettore()}
              <StepsLabel error={socioError} text={"Cosa Cerco"} />
              <RoundFiltersOne setItem={item => setSocio(item)} settori={TipoSocio} settoreAttivi={passedSettore} />
              <View style={{ height: 15 }}></View>
              {socio != "Socio Finanziatore" &&
                <WithErrorString
                  error={titleError}
                  errorText={"Campo Obbligatorio"}>
                  <StepsLabel error={titleError} text={"Titolo Posizione"} />
                  <FormTextInput
                    value={title}
                    style={titleError ? FormStyles.inputError : FormStyles.input}
                    onFocus={() => navigation.navigate("AutoComplete", { path: "Posizioni", items: TitoliPosizioni, for: "Titoli" })}
                    onChangeText={val => setTitle(val)}
                  />
                </WithErrorString>}
              {socio != "Socio Finanziatore" &&
                <View>
                  <StepsLabel error={categoriaError} text="Categoria (es. Economia, Ingegneria...)" />
                  <RoundFiltersOne setItem={item => setCategoria(item)} settori={Settori} settoreAttivi={passedCategoriaIndex} />
                </View>}
              {socio != "Socio Finanziatore" &&
                <View>
                  <StepsLabel text={"Requisiti"} />
                  {requisiti.length == 0 ?
                    <View style={FormStyles.requisiti}>
                      <TouchableWithoutFeedback onPress={() => {
                        navigation.navigate("AutoComplete", { path: "Posizioni", items: Requisiti, for: "Requisiti" })
                      }}>
                        <Light>AGGIUNGI REQUISITO +</Light>
                      </TouchableWithoutFeedback>
                    </View>
                    :
                    <View style={FormStyles.requisitiL}>
                      {requirements()}
                      <Light onPress={() => {
                        setActive(-1);
                        navigation.navigate("AutoComplete", { path: "Posizioni", items: Requisiti, for: "Requisiti" })
                      }} style={{ fontSize: 40, color: "#26547C", marginLeft: 10, alignSelf: "center" }}>+</Light>
                    </View>
                  }
                </View>}
            </View>}
          <StepsLabel text={"Descrizione"} />
          <FormTextInput
            large="true"
            multiline
            numberOfLines={4}
            placeholder="Esempio Descrizione"
            onFocus={() => setZoom(true)}
            onEndEditing={() => setZoom(false)}
            textAlignVertical={"top"}
            style={zoom ? FormStyles.xlarge : FormStyles.large}
            placeholderTextColor="#ADADAD"
            onChangeText={val => setDescription(val)}
            editable
            value={description}
          />
          {zoom && <View style={{ alignItems: "center" }}><RoundButton onPress={() => setZoom(false)} color={Colors.red} text={"OK"} textColor={"white"} />
          </View>}
          {socio == "Socio Finanziatore" ? buttons(true) : buttons()}
        </ScrollView>
      </View>
    </View >
  )
};

Posizioni.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  aggiungiWrapper: {
    alignItems: "center",
    flexDirection: "column",
    margin: 20,
    marginBottom: 10
  },
  buttonWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 28,
    marginTop: 40,
    marginBottom: 40
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    marginTop: 40
  },
  body: {
    flex: 8,
    marginLeft: isBigDevice ? 100 : 20,
    marginRight: isBigDevice ? 100 : 20,
  },
  header: {
    flex: 1.5
  },
  link: {
    color: "#26547C",
    textDecorationLine: "underline",
  }
});
