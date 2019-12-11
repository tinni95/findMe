import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native"
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
import { Ionicons } from "@expo/vector-icons";
import { Bold } from "../../components/StyledText";

const LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const UPDATEUSER_MUTATION = gql`
mutation updateUser($progetti:  ProgettoCreateManyInput) {
        updateUser(progetti:$progetti) {
            progetti{
                id
              }
    }
}`;

export default function ProgettiEditScreen({ navigation }) {
    const [zoom, setZoom] = useState(false)
    const [titolo, setTitolo] = useState("")
    const [titoloError, setTitoloError] = useState(false)
    const [sottoTitolo, setSottoTitolo] = useState("")
    const [sottoTitoloError, setSottoTitoloError] = useState(false)
    const [link, setLink] = useState("")
    const [linkError, setLinkError] = useState(false)
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
                navigation.navigate("ProfilePage", { refetch: Math.floor((Math.random() * -1000)) })
            }
        });

    const handlePress = async () => {
        if (titolo.length === 0) {
            setTitoloError(true);
            valid = false
        }
        else {
            setTitoloError(false)
            valid = true
        }
        if (sottoTitolo.length === 0) {
            setSottoTitoloError(true);
            valid = false
        }
        else {
            setSottoTitoloError(false)
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
        if (titolo.length > 0 && sottoTitolo.length > 0 && (link.length == 0 || link.match(LINK_REGEX)) && descrizione.length > 0 && dataInizio.length > 0
            && dataFine.length > 0 && !invalidDate(dataInizio, dataFine)) {
            updateUser(
                {
                    variables: {
                        progetti: {
                            create: {
                                titolo,
                                sottoTitolo,
                                link,
                                descrizione,
                                dataInizio,
                                dataFine,
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
                    <StepsLabel text={"Titolo"} />
                    <WithErrorString error={titoloError} errorText={"Campo Obbligatorio"}>
                        <FormTextInput
                            placeholder=""
                            onChangeText={val => setTitolo(val)}
                            value={titolo}
                            style={titoloError ? FormStyles.inputError : FormStyles.input}
                        />
                    </WithErrorString>
                    <StepsLabelWithHint text={"Sotto titolo"} tooltipText={"una breve sintesi in 3 parole"} />
                    <WithErrorString error={sottoTitoloError} errorText={"Campo Obbligatorio"}>
                        <FormTextInput
                            placeholder=""
                            onChangeText={val => setSottoTitolo(val)}
                            value={sottoTitolo}
                            style={sottoTitoloError ? FormStyles.inputError : FormStyles.input}
                        />
                    </WithErrorString>
                    <StepsLabelWithHint text={"Link Progetto"} tooltipText={"link a progetto"} />
                    <WithErrorString error={linkError} errorText={"Non è un link"}>
                        <FormTextInput
                            placeholder=""
                            onChangeText={val => setLink(val)}
                            value={link}
                            style={linkError ? FormStyles.inputError : FormStyles.input}
                        />
                    </WithErrorString>
                    <View style={styles.separator}></View>
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

ProgettiEditScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "PROGETTO",
        headerStyle: {
            ...Platform.select({
                ios: {
                    shadowColor: "black",
                    shadowOffset: { height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3
                },
                android: {
                    elevation: 20
                },
            })
        },
        headerTitleStyle: {
            fontFamily: "sequel-sans-bold",
            color: Colors.blue,
            fontSize: 12
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, margin: 20 },
    buttonWrapper: {
        alignItems: "center",
        margin: 35
    },
    separator: { height: 20 }
})