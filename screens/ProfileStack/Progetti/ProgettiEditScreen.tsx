import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WithErrorString from "../../../shared/components/Form/WithErrorString";
import StepsLabel, {
  StepsLabelWithHint
} from "../../../shared/components/StepsLabel";
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

const UPDATEUSER_MUTATION = gql`
  mutation updateUser($progetti: ProgettoCreateManyInput) {
    updateUser(progetti: $progetti) {
      progetti {
        id
      }
    }
  }
`;

const UPDATEPROGETTO_MUTATION = gql`
  mutation updateProgetto(
    $id: ID!
    $titolo: String
    $sottoTitolo: String
    $dataInizio: String
    $dataFine: String
    $link: String
    $descrizione: String
  ) {
    updateProgetto(
      id: $id
      titolo: $titolo
      sottoTitolo: $sottoTitolo
      dataInizio: $dataInizio
      dataFine: $dataFine
      link: $link
      descrizione: $descrizione
    ) {
      id
    }
  }
`;

export default function ProgettiEditScreen({ navigation, route }) {
  let preinput = useRef<any>();
  let linkInput = useRef<any>();
  let sottoTitoloInput = useRef<any>();
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight text={"Conferma"} onPress={() => handlePress()} />
    )
  });
  const progetto = route.params?.progetto ?? null;
  const [lock, setLock] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [titolo, setTitolo] = useState(progetto ? progetto.titolo : "");
  const [titoloError, setTitoloError] = useState(false);
  const [sottoTitolo, setSottoTitolo] = useState(
    progetto ? progetto.sottoTitolo : ""
  );
  const [sottoTitoloError, setSottoTitoloError] = useState(false);
  const [link, setLink] = useState(progetto ? progetto.link : "");
  const [linkError, setLinkError] = useState(false);
  const [dataInizio, setDataInizio] = useState(
    progetto ? progetto.dataInizio : ""
  );
  const [dataInizioError, setDataInizioError] = useState(false);
  const [dataFineError, setDataFineError] = useState(false);
  const [datesError, setDatesError] = useState(false);
  const [dataFine, setDataFine] = useState(progetto ? progetto.dataFine : "");
  const [descrizione, setDescrizione] = useState(
    progetto ? progetto.descrizione : ""
  );
  const [descrizioneError, setDescrizioneError] = useState(false);

  useEffect(() => {
    !progetto && preinput.current.focus();
  }, []);

  //mutation
  const [updateUser] = useMutation(UPDATEUSER_MUTATION, {
    onCompleted: async ({ updateUser }) => {
      navigation.navigate("ProfilePage", {
        refetch: Math.floor(Math.random() * -1000)
      });
    }
  });

  const [updateProgetto] = useMutation(UPDATEPROGETTO_MUTATION, {
    onCompleted: async ({ updateProgetto }) => {
      navigation.navigate("ProfilePage", {
        refetch: Math.floor(Math.random() * -1000)
      });
    }
  });

  const handlePress = async () => {
    if (titolo.length === 0) {
      setTitoloError(true);
    } else {
      setTitoloError(false);
    }
    if (sottoTitolo.length === 0) {
      setSottoTitoloError(true);
    } else {
      setSottoTitoloError(false);
    }
    if (!(link.length == 0) && !link.match(LINK_REGEX)) {
      setLinkError(true);
    } else {
      setLinkError(false);
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
      titolo.length > 0 &&
      sottoTitolo.length > 0 &&
      (link.length == 0 || link.match(LINK_REGEX)) &&
      descrizione.length > 0 &&
      dataInizio.length > 0 &&
      dataFine.length > 0 &&
      !invalidDate(dataInizio, dataFine) &&
      !lock
    ) {
      setLock(true);
      progetto
        ? updateProgetto({
            variables: {
              id: progetto.id,
              dataInizio,
              dataFine,
              link,
              titolo,
              sottoTitolo
            }
          })
        : updateUser({
            variables: {
              progetti: {
                create: {
                  titolo,
                  sottoTitolo,
                  link,
                  descrizione,
                  dataInizio,
                  dataFine
                }
              }
            }
          });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!zoom && (
        <View>
          <StepsLabel text={"Titolo"} />
          <WithErrorString error={titoloError} errorText={"Campo Obbligatorio"}>
            <FormTextInput
              reference={preinput}
              placeholder=""
              onChangeText={val => setTitolo(val)}
              value={titolo}
              style={titoloError ? FormStyles.inputError : FormStyles.input}
              onSubmitEditing={() => sottoTitoloInput.current.focus()}
            />
          </WithErrorString>
          <StepsLabelWithHint
            text={"Sotto titolo"}
            tooltipText={"una breve sintesi in 3 parole"}
          />
          <WithErrorString
            error={sottoTitoloError}
            errorText={"Campo Obbligatorio"}
          >
            <FormTextInput
              reference={sottoTitoloInput}
              placeholder=""
              onChangeText={val => setSottoTitolo(val)}
              value={sottoTitolo}
              style={
                sottoTitoloError ? FormStyles.inputError : FormStyles.input
              }
              onSubmitEditing={() => linkInput.current.focus()}
            />
          </WithErrorString>
          <StepsLabelWithHint
            text={"Link Progetto"}
            tooltipText={"link a progetto"}
          />
          <WithErrorString error={linkError} errorText={"Non è un link"}>
            <FormTextInput
              reference={linkInput}
              autoCapitalize="none"
              placeholder=""
              onChangeText={val => setLink(val)}
              value={link}
              style={linkError ? FormStyles.inputError : FormStyles.input}
            />
          </WithErrorString>
          <View style={styles.separator}></View>
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
        onChangeText={val => setDescrizione(val)}
        value={descrizione}
        onFocus={() => setZoom(true)}
        onEndEditing={() => setZoom(false)}
        textAlignVertical={"top"}
        style={zoom ? FormStyles.xlarge : FormStyles.large}
      />
      {zoom && (
        <RoundButton
          onPress={() => setZoom(false)}
          color={Colors.red}
          text={"Conferma"}
          textColor={"white"}
        />
      )}
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
