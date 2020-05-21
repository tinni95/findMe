import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import WithErrorString from '../../../shared/components/Form/WithErrorString';
import StepsLabel from '../../../shared/components/StepsLabel';
import FormTextInput from '../../../shared/components/Form/FormTextInput';
import { FormStyles } from '../../../shared/components/Form/FormStyles';
import DataInizioFine from '../../../shared/components/DataInizioFine';
import { invalidDate } from '../../../shared/functions/InvalidDate';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ZoomButton from '../../../shared/components/ZoomButton';
import HeaderRight from '../../../shared/components/HeaderRight';
import LINK_REGEX from '../../../shared/constants/linkRegex';
import HeaderLeft from '../../../shared/components/HeaderLeft';

const UPDATEUSER_MUTATION = gql`
  mutation updateUser($formazioni: FormazioneCreateManyInput) {
    updateUser(formazioni: $formazioni) {
      formazioni {
        id
      }
    }
  }
`;

const UPDATEFORMAZIONE_MUTATION = gql`
  mutation updateFormazione(
    $id: ID!
    $istituto: String
    $corso: String
    $dataInizio: String
    $dataFine: String
    $link: String
    $descrizione: String
  ) {
    updateFormazione(
      id: $id
      istituto: $istituto
      corso: $corso
      dataInizio: $dataInizio
      dataFine: $dataFine
      link: $link
      descrizione: $descrizione
    ) {
      id
    }
  }
`;

export default function FormazioneEditScreen({ navigation }) {
  const preInput = useRef<any>();
  const corsoInput = useRef<any>();
  const formazione = navigation.getParam('formazione', null);
  useEffect(() => {
    !formazione && preInput.current.focus();
  }, []);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [lock, setLock] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [istituto, setIstituto] = useState(formazione ? formazione.istituto : '');
  const [istitutoError, setIstitutoError] = useState(false);
  const [link, setLink] = useState(formazione ? formazione.link : '');
  const [linkError, setLinkError] = useState(false);
  const [corso, setCorso] = useState(formazione ? formazione.corso : '');
  const [corsoError, setCorsoError] = useState(false);
  const [dataInizio, setDataInizio] = useState(formazione ? formazione.dataInizio : '');
  const [dataInizioError, setDataInizioError] = useState(false);
  const [dataFineError, setDataFineError] = useState(false);
  const [datesError, setDatesError] = useState(false);
  const [dataFine, setDataFine] = useState(formazione ? formazione.dataFine : '');
  const [descrizione, setDescrizione] = useState(formazione ? formazione.descrizione : '');
  const [descrizioneError, setDescrizioneError] = useState(false);
  //mutation
  const [updateUser] = useMutation(UPDATEUSER_MUTATION, {
    onCompleted: async ({ updateUser }) => {
      navigation.navigate('ProfilePage', {
        refetch: Math.floor(Math.random() * -1000),
      });
    },
  });

  const [updateFormazione] = useMutation(UPDATEFORMAZIONE_MUTATION, {
    onCompleted: async ({ updateFormazione }) => {
      navigation.navigate('ProfilePage', {
        refetch: Math.floor(Math.random() * -1000),
      });
    },
  });

  useEffect(() => {
    navigation.setParams({ handlePress });
  }, [istituto, dataInizio, corso, dataFine, descrizione]);

  const handlePress = async () => {
    if (istituto.length === 0) {
      setIstitutoError(true);
    } else {
      setIstitutoError(false);
    }
    if (corso.length === 0) {
      setCorsoError(true);
    } else {
      setCorsoError(false);
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
    if (dataFine.length > 0 && dataInizio.length > 0 && invalidDate(dataInizio, dataFine)) {
      setDatesError(true);
    } else {
      setDatesError(false);
    }
    if (
      istituto.length > 0 &&
      (link.length == 0 || link.match(LINK_REGEX)) &&
      corso.length > 0 &&
      descrizione.length > 0 &&
      dataInizio.length > 0 &&
      dataFine.length > 0 &&
      !invalidDate(dataInizio, dataFine) &&
      !lock
    ) {
      setLock(true);
      formazione
        ? updateFormazione({
            variables: {
              id: formazione.id,
              istituto,
              link,
              descrizione,
              corso,
              dataInizio,
              dataFine,
            },
          })
        : updateUser({
            variables: {
              formazioni: {
                create: {
                  istituto,
                  link,
                  descrizione,
                  dataInizio,
                  dataFine,
                  corso,
                },
              },
            },
          });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!zoom && (
        <View>
          <StepsLabel text={'Istituto'} />
          <WithErrorString error={istitutoError} errorText={'Campo Obbligatorio'}>
            <FormTextInput
              reference={preInput}
              placeholder="Nome"
              onChangeText={(val) => setIstituto(val)}
              value={istituto}
              style={istitutoError ? FormStyles.inputError : FormStyles.input}
              onSubmitEditing={() => corsoInput.current.focus()}
            />
          </WithErrorString>
          <View style={styles.separator}></View>
          <StepsLabel text={'Corso Di Studi'} />
          <WithErrorString error={corsoError} errorText={'Campo Obbligatorio'}>
            <FormTextInput
              placeholder="Titolo"
              reference={corsoInput}
              onChangeText={(val) => setCorso(val)}
              value={corso}
              style={corsoError ? FormStyles.inputError : FormStyles.input}
            />
          </WithErrorString>
          <WithErrorString error={datesError} errorText="Le date non sono valide">
            <DataInizioFine
              modal1={modal1}
              modal2={modal2}
              dataInizio={dataInizio}
              dataFine={dataFine}
              setDataFine={setDataFine}
              setDataInizio={setDataInizio}
              dataInizioError={dataInizioError}
              dataFineError={dataFineError}></DataInizioFine>
          </WithErrorString>
          <View style={styles.separator}></View>
        </View>
      )}
      <StepsLabel error={descrizioneError} text={'Descrizione'} />
      <FormTextInput
        large="true"
        multiline
        numberOfLines={4}
        placeholder="Titolo"
        onChangeText={(val) => setDescrizione(val)}
        value={descrizione}
        onFocus={() => setZoom(true)}
        onEndEditing={() => setZoom(false)}
        textAlignVertical={'top'}
        style={zoom ? FormStyles.xlarge : FormStyles.large}
      />
      {zoom && <ZoomButton onPress={() => setZoom(false)} />}
      <View style={{ height: 35 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1, padding: 20 },
  buttonWrapper: {
    alignItems: 'center',
    margin: 35,
  },
  separator: { height: 20 },
});

FormazioneEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => <HeaderLeft navigation={navigation}></HeaderLeft>,
    title: '',
    headerRight: () => (
      <HeaderRight text={'Conferma'} onPress={() => navigation.getParam('handlePress', null)()} />
    ),
  };
};
