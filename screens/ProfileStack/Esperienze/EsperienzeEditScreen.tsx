import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WithErrorString from "../../../shared/components/Form/WithErrorString";
import StepsLabel from "../../../shared/components/StepsLabel";
import FormTextInput from "../../../shared/components/Form/FormTextInput";
import { FormStyles } from "../../../shared/components/Form/FormStyles";
import RoundButton from "../../../shared/components/RoundButton";
import Colors from "../../../shared/constants/Colors";
import DataInizioFine from "../../../shared/components/DataInizioFine";
import { invalidDate } from "../../../shared/functions/InvalidDate";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import HeaderRight from "../../../shared/components/HeaderRight";
import LINK_REGEX from "../../../shared/constants/linkRegex";
import ZoomButton from "../../../shared/components/ZoomButton";

const UPDATEUSER_MUTATION = gql`
  mutation updateUser($esperienze: EsperienzaCreateManyInput) {
    updateUser(esperienze: $esperienze) {
      esperienze {
        id
      }
    }
  }
`;

const UPDATEESPERIENZA_MUTATION = gql`
  mutation updateEsperienza(
    $id: ID!
    $compagnia: String
    $titolo: String
    $dataInizio: String
    $dataFine: String
    $link: String
    $descrizione: String
  ) {
    updateEsperienza(
      id: $id
      compagnia: $compagnia
      titolo: $titolo
      dataInizio: $dataInizio
      dataFine: $dataFine
      link: $link
      descrizione: $descrizione
    ) {
      id
    }
  }
`;

export default function EsperienzeEditScreen({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight text={"Conferma"} onPress={() => handlePress()} />
    )
  });
  const esperienza = route.params?.esperienza ?? null;
  let preInput = useRef<any>();
  let linkInput = useRef<any>();
  let positionTitle = useRef<any>();
  useEffect(() => {
    !esperienza && preInput.current.focus();
  }, []);

  const [zoom, setZoom] = useState(false);
  const [lock, setLock] = useState(false);
  const [compagnia, setCompagnia] = useState(
    esperienza ? esperienza.compagnia : ""
  );
  const [compagniaError, setCompagniaError] = useState(false);
  const [link, setLink] = useState(esperienza ? esperienza.link : "");
  const [linkError, setLinkError] = useState(false);
  const [posizione, setPosizione] = useState(
    esperienza ? esperienza.titolo : ""
  );
  const [posizioneError, setPosizioneError] = useState(false);
  const [dataInizio, setDataInizio] = useState(
    esperienza ? esperienza.dataInizio : ""
  );
  const [dataInizioError, setDataInizioError] = useState(false);
  const [dataFineError, setDataFineError] = useState(false);
  const [datesError, setDatesError] = useState(false);
  const [dataFine, setDataFine] = useState(
    esperienza ? esperienza.dataFine : ""
  );
  const [descrizione, setDescrizione] = useState(
    esperienza ? esperienza.descrizione : ""
  );
  const [descrizioneError, setDescrizioneError] = useState(false);
  //mutation
  const [updateUser] = useMutation(UPDATEUSER_MUTATION, {
    onCompleted: async ({ updateUser }) => {
      navigation.navigate("ProfilePage", {
        refetch: Math.floor(Math.random() * -1000)
      });
    }
  });
  const [updateEsperienza] = useMutation(UPDATEESPERIENZA_MUTATION, {
    onCompleted: async ({ updateEsperienza }) => {
      navigation.navigate("ProfilePage", {
        refetch: Math.floor(Math.random() * -1000)
      });
    }
  });

  const handlePress = async () => {
    if (compagnia.length === 0) {
      setCompagniaError(true);
    } else {
      setCompagniaError(false);
    }
    if (!(link.length == 0) && !link.match(LINK_REGEX)) {
      setLinkError(true);
    } else {
      setLinkError(false);
    }
    if (posizione.length === 0) {
      setPosizioneError(true);
    } else {
      setPosizioneError(false);
    }
    if (descrizione.length === 0) {
      setDescrizioneError(true);
    } else {
      setDescrizioneError(false);
    }
    if (dataInizio.length === 0) {
      setDataInizioError(true);
    } else {
      setDataInizioError(false);
    }
    if (dataFine.length === 0) {
      setDataFineError(true);
    } else {
      setDataFineError(false);
    }
    if (
      dataFine.length > 0 &&
      dataInizio.length > 0 &&
      invalidDate(dataInizio, dataFine)
    ) {
      setDatesError(true);
    } else {
      setDatesError(false);
    }
    if (
      compagnia.length > 0 &&
      (link.length == 0 || link.match(LINK_REGEX)) &&
      posizione.length > 0 &&
      descrizione.length > 0 &&
      dataInizio.length > 0 &&
      dataFine.length > 0 &&
      !invalidDate(dataInizio, dataFine) &&
      !lock
    ) {
      setLock(true);
      esperienza
        ? updateEsperienza({
            variables: {
              id: esperienza.id,
              compagnia,
              titolo: posizione,
              dataFine,
              dataInizio,
              descrizione
            }
          })
        : updateUser({
            variables: {
              esperienze: {
                create: {
                  compagnia,
                  link,
                  descrizione,
                  dataInizio,
                  dataFine,
                  titolo: posizione
                }
              }
            }
          });
    } else {
      console.log("no");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!zoom && (
        <View>
          <StepsLabel text={"Compagnia"} />
          <WithErrorString
            error={compagniaError}
            errorText={"Campo Obbligatorio"}
          >
            <FormTextInput
              reference={preInput}
              placeholder="Nome"
              onChangeText={val => setCompagnia(val)}
              value={compagnia}
              style={compagniaError ? FormStyles.inputError : FormStyles.input}
              onSubmitEditing={() => linkInput.current.focus()}
            />
          </WithErrorString>
          <WithErrorString error={linkError} errorText={"Non è un link"}>
            <FormTextInput
              reference={linkInput}
              autoCapitalize="none"
              placeholder="Sito Web"
              onChangeText={val => setLink(val)}
              value={link}
              style={linkError ? FormStyles.inputError : FormStyles.input}
              onSubmitEditing={() => positionTitle.current.focus()}
            />
          </WithErrorString>
          <View style={styles.separator}></View>
          <StepsLabel text={"Posizione"} />
          <WithErrorString
            error={posizioneError}
            errorText={"Campo Obbligatorio"}
          >
            <FormTextInput
              reference={positionTitle}
              placeholder="Titolo"
              onChangeText={val => setPosizione(val)}
              value={posizione}
              style={posizioneError ? FormStyles.inputError : FormStyles.input}
            />
          </WithErrorString>
          <WithErrorString
            error={datesError}
            errorText="Le date non sono valide"
          >
            <DataInizioFine
              dataInizio={dataInizio}
              dataFine={dataFine}
              setDataFine={setDataFine}
              setDataInizio={setDataInizio}
              dataInizioError={dataInizioError}
              dataFineError={dataFineError}
            ></DataInizioFine>
          </WithErrorString>
          <View style={styles.separator}></View>
        </View>
      )}
      <StepsLabel error={descrizioneError} text={"Descrizione"} />
      <FormTextInput
        large="true"
        multiline
        numberOfLines={4}
        placeholder="Titolo"
        onChangeText={val => setDescrizione(val)}
        value={descrizione}
        onFocus={() => setZoom(true)}
        onEndEditing={() => setZoom(false)}
        textAlignVertical={"top"}
        style={zoom ? FormStyles.xlarge : FormStyles.large}
      />
      {zoom && <ZoomButton onPress={() => setZoom(false)} />}
      <View style={{ height: 35 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 20 },
  buttonWrapper: {
    alignItems: "center",
    margin: 35
  },
  separator: { height: 20 }
});
