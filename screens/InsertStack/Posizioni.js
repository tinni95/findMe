import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StepsLabel, StepsLabelError } from "./StepsLabel";
import { AddButton } from "./AddButton";
import WithErrorString from "../shared/Form/WithErrorString";
import { StepsIndicator } from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import { RoundFilters } from "../Explore/FiltersStack/components/RoundFilters";
import RoundButton from '../../components/shared/RoundButton';
import RoundButtonEmptyUniversal from '../../components/shared/RoundButtonEmptyUniversal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POST_POSIZIONI = gql`
  query PosizioniQuery {
    postPositions @client{
      field
      type
      description
      title
    }
  }
`;

const Settori = ["Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro", "Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro", "Fashion", "Ingegneria", "Ristorazione", "Fantozzi", "Cinofilia", "Musica", "Arte", "Teatro"];
const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];
const autoCompleteItems = [
  {
    name: "passsa",
    id: "sad",
    settore: "Aereonautica"
  },
  {
    name: "dasd",
    id: "sa21321d",
    settore: "Aereonautica"
  },
  {
    name: "pusst",
    id: "das",
    settore: "Aereonautica"
  }
]

export function Posizioni({ navigation, settore }) {
  //Hooks
  const [title, setTitle] = useState("");
  const [socio, setSocio] = useState([]);
  const [posizioniError, setPosizioniError] = useState(false);
  const [socioError, setSocioError] = useState(false);
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoriaError, setCategoriaError] = useState("");
  const [categoria, setCategoria] = useState([]);
  //Data
  const { data } = useQuery(POST_POSIZIONI);
  const posizioni = data.postPositions || [];
  let passedTitle = navigation.getParam("item") || null
  let passedSettore = navigation.getParam("settore") || null

  useEffect(() => {
    passedTitle ? setTitle(passedTitle.name ? passedTitle.name : "") : null
  }, [passedTitle])

  useEffect(() => {
    resetState();
  }, [passedSettore])


  const resetState = () => {
    passedTitle = null
    setTitle("");
    setDescription("");
    setSocio([]);
    setCategoria([]);
  }

  const addItem1 = item => {
    setSocio([item]);
  };
  const addItem = item => {
    setCategoria([item]);
  };

  const handleAggiungi = (bool) => {
    if (description.length === 0) {
      setDescriptionError(true)
    } else {
      setDescriptionError(false)
    }
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

    if (description.length > 0 && (categoria.length > 0 && socio.length > 0 && title.length > 0) || bool) {
      navigation.navigate("ConfermaPosizione", {
        description,
        categoria: Settori.indexOf(categoria[0]),
        socio: TipoSocio.indexOf(socio[0])
        , title
      });
    }
  }
  const buttons = (bool) => {
    return (
      <View>
        <View style={styles.aggiungiWrapper}>
          {posizioni.length == 0 ?
            <View>
              {posizioniError ? <StepsLabelError text="Aggiungi Una Posizione" /> :
                <StepsLabel text="Aggiungi Una Posizione" />}
            </View>
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
      <View style={styles.header}>
        <StepsIndicator navigation={navigation} active={2}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {socioError ?
            <StepsLabelError text={"Cosa Cerco"} />
            :
            <StepsLabel text={"Cosa Cerco"} />
          }
          <RoundFilters maximum={1} items={categoria} addItem={addItem1} settori={TipoSocio} settoreAttivi={passedSettore} />
          <View style={{ height: 15 }}></View>
          {socio != "Socio Finanziatore" ?
            < WithErrorString
              error={titleError}
              errorText={"Campo Obbligatorio"}>
              <FormTextInput
                value={title}
                onFocus={() => navigation.navigate("AutoComplete", { path: "Posizioni", items: autoCompleteItems })}
                onChangeText={val => setTitle(val)}
                placeholder="Titolo Posizione"
                error={titleError}
              />
            </WithErrorString>
            : null}
          {descriptionError ?
            <StepsLabelError text={"Descrizione"} />
            :
            <StepsLabel text={"Descrizione"} />
          }
          <FormTextInput
            large="true"
            multiline
            numberOfLines={4}
            placeholder="Descrizione"
            placeholderTextColor="#ADADAD"
            onChangeText={val => setDescription(val)}
            editable
            error={descriptionError}
            value={description}
          />
          {socio != "Socio Finanziatore" ?
            <View>{categoriaError ? <StepsLabelError text="Categoria" /> :
              <StepsLabel text="Categoria (es. Economia, Ingegneria...)" />}
              <RoundFilters maximum={1} items={categoria} addItem={addItem} settori={Settori} settoreAttivi={passedSettore} />
            </View>
            : null}
          {socio !== "Socio Finanziatore" ? buttons(true) : buttons()}
        </KeyboardAwareScrollView>
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
    marginLeft: Platform.OS == "web" ? 100 : 20,
    marginRight: Platform.OS == "web" ? 100 : 20,

  },
  header: {
    flex: 1.5
  },
  link: {
    color: "#26547C",
    textDecorationLine: "underline",
  }
});
