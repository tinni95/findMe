import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Modal, Text } from "react-native"
import WithErrorString from "../shared/Form/WithErrorString";
import StepsLabel, { StepsLabelWithHint } from "../shared/StepsLabel";
import FormTextInput from "../shared/Form/FormTextInput";
import { FormStyles } from "../shared/Form/FormStyles";
import RoundButton from "../../components/shared/RoundButton";
import Colors from "../../constants/Colors";
import DataInizioFine from "./DataInizioFine"
import { invalidDate } from "./helpers";
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
const LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const UPDATEUSER_MUTATION = gql`
mutation updateUser($formazioni:  FormazioneCreateManyInput) {
        updateUser(formazioni:$formazioni) {
            formazioni{
                id
              }
    }
}`;

export default function FormazioneEditScreen({ navigation }) {
    const [zoom, setZoom] = useState(false)
    const [istituto, setIstituto] = useState("")
    const [istitutoError, setIstitutoError] = useState(false)
    const [link, setLink] = useState("")
    const [linkError, setLinkError] = useState(false)
    const [corso, setCorso] = useState("")
    const [corsoError, setCorsoError] = useState(false)
    const [dataInizio, setDataInizio] = useState("")
    const [dataInizioError, setDataInizioError] = useState(false)
    const [dataFineError, setDataFineError] = useState(false)
    const [datesError, setDatesError] = useState(false)
    const [dataFine, setDataFine] = useState("")
    const [descrizione, setDescrizione] = useState("")
    const [descrizioneError, setDescrizioneError] = useState(false)
    //mutation
    const [updateUser] = useMutation(UPDATEUSER_MUTATION,
        {
            onCompleted: async ({ updateUser }) => {
                console.log(updateUser)
                navigation.navigate("ProfilePage", { refetch: Math.floor((Math.random() * -1000)) })
            }
        });

    const handlePress = async () => {
        if (istituto.length === 0) {
            setIstitutoError(true);
            valid = false
        }
        else {
            setIstitutoError(false)
            valid = true
        }
        if (!link.length == 0 && !link.match(LINK_REGEX)) {
            setLinkError(true);
            valid = false
        }
        else {
            setLinkError(false)
            valid = true
        }

        if (corso.length === 0) {
            setCorsoError(true);
            valid = false
        }
        else {
            setCorsoError(false)
            valid = true
        }
        if (descrizione.length === 0) {
            setDescrizioneError(true);
            valid = false
        }
        else {
            setDescrizioneError(false)
            valid = true
        }
        if (dataInizio.length === 0) {
            setDataInizioError(true);
            valid = false
        }
        else {
            setDataInizioError(false)
            valid = true
        }
        if (dataFine.length === 0) {
            setDataFineError(true);
            valid = false
        }
        else {
            setDataFineError(false);
            valid = true
        }
        if (dataFine.length > 0 && dataInizio.length > 0 && invalidDate(dataInizio, dataFine)) {
            setDatesError(true);
            valid = false
        }
        else {
            setDatesError(false);
            valid = true
        }
        if (istituto.length > 0 && (link.length == 0 || link.match(LINK_REGEX)) && corso.length > 0 && descrizione.length > 0 && dataInizio.length > 0
            && dataFine.length > 0 && !invalidDate(dataInizio, dataFine)) {
            updateUser(
                {
                    variables: {
                        formazioni: {
                            create: {
                                istituto,
                                link,
                                descrizione,
                                dataInizio,
                                dataFine,
                                corso
                            }
                        }
                    }
                }
            )
        }

    }

    return (
        <ScrollView style={styles.container}>
            {!zoom &&
                <View>
                    <StepsLabel text={"Istituto"} />
                    <WithErrorString error={istitutoError} errorText={"Campo Obbligatorio"}>
                        <FormTextInput
                            placeholder="Nome"
                            onChangeText={val => setIstituto(val)}
                            value={istituto}
                            style={istitutoError ? FormStyles.inputError : FormStyles.input}
                        />
                    </WithErrorString>
                    <WithErrorString error={linkError} errorText={"Non è un link"}>
                        <FormTextInput
                            placeholder="Sito Web"
                            onChangeText={val => setLink(val)}
                            value={link}
                            style={linkError ? FormStyles.inputError : FormStyles.input}
                        />
                    </WithErrorString>
                    <View style={styles.separator}></View>
                    <StepsLabel text={"Corso Di Studi"} />
                    <WithErrorString error={corsoError} errorText={"Campo Obbligatorio"}>
                        <FormTextInput
                            placeholder="Titolo"
                            onChangeText={val => setCorso(val)}
                            value={corso}
                            style={corsoError ? FormStyles.inputError : FormStyles.input}
                        />
                    </WithErrorString>
                    <WithErrorString error={datesError} errorText="Le date non sono valide">
                        <DataInizioFine dataInizio={dataInizio} dataFine={dataFine} setDataFine={setDataFine} setDataInizio={setDataInizio}
                            dataInizioError={dataInizioError} e dataFineError={dataFineError}></DataInizioFine>
                    </WithErrorString>
                    <View style={styles.separator}></View>
                </View>}
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
            {zoom && <RoundButton onPress={() => setZoom(false)} color={Colors.red} text={"OK"} textColor={"white"} />}
            <View style={styles.buttonWrapper}>
                {!zoom && <RoundButton onPress={() => handlePress()} text={"CONFERMA"} color={Colors.blue} textColor="white"></RoundButton>}
            </View>
        </ScrollView>
    )

}

FormazioneEditScreen.navigationOptions = {
    title: "Aggiungi Formazione"
}
const styles = StyleSheet.create({
    container: { flex: 1, margin: 20 },
    buttonWrapper: {
        alignItems: "center",
        margin: 35
    },
    separator: { height: 20 }
})