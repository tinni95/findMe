import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native"
import WithErrorString from "../../shared/Form/WithErrorString";
import StepsLabel, { StepsLabelWithHint } from "../../shared/StepsLabel";
import FormTextInput from "../../shared/Form/FormTextInput";
import { FormStyles } from "../../shared/Form/FormStyles";
import RoundButton from "../../../components/shared/RoundButton";
import Colors from "../../../constants/Colors";
import DataInizioFine from "../shared/DataInizioFine"
import { invalidDate } from "../shared/helpers";
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { Ionicons } from "@expo/vector-icons";
import { Bold } from "../../../components/StyledText";

const LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const UPDATEUSER_MUTATION = gql`
mutation updateUser($esperienze:  EsperienzaCreateManyInput) {
        updateUser(esperienze:$esperienze) {
            esperienze{
                id
              }
    }
}`;

const UPDATEESPERIENZA_MUTATION = gql`
mutation updateEsperienza($id: ID!, $compagnia:String,
    $titolo:String,$dataInizio:String,$dataFine:String,$link:String,$descrizione:String) {
        updateEsperienza(id: $id, compagnia:$compagnia,
    titolo:$titolo,dataInizio:$dataInizio,dataFine:$dataFine,link:$link,descrizione:$descrizione) {
                id
    }
}`;

export default function EsperienzeEditScreen({ navigation }) {
    const esperienza = navigation.getParam("esperienza")
    const [zoom, setZoom] = useState(false)
    const [compagnia, setCompagnia] = useState(esperienza ? esperienza.compagnia : "")
    const [compagniaError, setCompagniaError] = useState(false)
    const [link, setLink] = useState(esperienza ? esperienza.link : "")
    const [linkError, setLinkError] = useState(false)
    const [posizione, setPosizione] = useState(esperienza ? esperienza.titolo : "")
    const [posizioneError, setPosizioneError] = useState(false)
    const [dataInizio, setDataInizio] = useState(esperienza ? esperienza.dataInizio : "")
    const [dataInizioError, setDataInizioError] = useState(false)
    const [dataFineError, setDataFineError] = useState(false)
    const [datesError, setDatesError] = useState(false)
    const [dataFine, setDataFine] = useState(esperienza ? esperienza.dataFine : "")
    const [descrizione, setDescrizione] = useState(esperienza ? esperienza.descrizione : "")
    const [descrizioneError, setDescrizioneError] = useState(false)
    //mutation
    const [updateUser] = useMutation(UPDATEUSER_MUTATION,
        {
            onCompleted: async ({ updateUser }) => {
                navigation.navigate("ProfilePage", { refetch: Math.floor((Math.random() * -1000)) })
            }
        });
    const [updateEsperienza] = useMutation(UPDATEESPERIENZA_MUTATION,
        {
            onCompleted: async ({ updateEsperienza }) => {
                navigation.navigate("ProfilePage", { refetch: Math.floor((Math.random() * -1000)) })
            }
        });

    const handlePress = async () => {
        if (compagnia.length === 0) {
            setCompagniaError(true);
            valid = false
        }
        else {
            setCompagniaError(false)
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
        if (posizione.length === 0) {
            setPosizioneError(true);
            valid = false
        }
        else {
            setPosizioneError(false)
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
        if (compagnia.length > 0 && (link.length == 0 || link.match(LINK_REGEX)) && posizione.length > 0 && descrizione.length > 0 && dataInizio.length > 0
            && dataFine.length > 0 && !invalidDate(dataInizio, dataFine)) {
            esperienza ?
                updateEsperienza(
                    {
                        variables: {
                            id: esperienza.id,
                            compagnia,
                            titolo: posizione,
                            dataFine,
                            dataInizio,
                            descrizione
                        }
                    }
                )
                :
                updateUser(
                    {
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
                    }
                )
        } else { console.log("no") }

    }

    return (
        <ScrollView style={styles.container}>
            {!zoom &&
                <View>
                    <StepsLabel text={"Compagnia"} />
                    <WithErrorString error={compagniaError} errorText={"Campo Obbligatorio"}>
                        <FormTextInput
                            placeholder="Nome"
                            onChangeText={val => setCompagnia(val)}
                            value={compagnia}
                            style={compagniaError ? FormStyles.inputError : FormStyles.input}
                        />
                    </WithErrorString>
                    <WithErrorString error={linkError} errorText={"Non è un link"}>
                        <FormTextInput
                            autoCapitalize="none"
                            placeholder="Sito Web"
                            onChangeText={val => setLink(val)}
                            value={link}
                            style={linkError ? FormStyles.inputError : FormStyles.input}
                        />
                    </WithErrorString>
                    <View style={styles.separator}></View>
                    <StepsLabel text={"Posizione"} />
                    <WithErrorString error={posizioneError} errorText={"Campo Obbligatorio"}>
                        <FormTextInput
                            placeholder="Titolo"
                            onChangeText={val => setPosizione(val)}
                            value={posizione}
                            style={posizioneError ? FormStyles.inputError : FormStyles.input}
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

EsperienzeEditScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "ESPERIENZA",
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