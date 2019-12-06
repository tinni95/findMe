import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native"
import WithErrorString from "../shared/Form/WithErrorString";
import StepsLabel, { StepsLabelWithHint } from "../shared/StepsLabel";
import FormTextInput from "../shared/Form/FormTextInput";
import { FormStyles } from "../shared/Form/FormStyles";
import RoundButton from "../../components/shared/RoundButton";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment/min/moment-with-locales'

moment.locale('it')
const LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export default function FormazioniScreen({ navigation }) {
    const [zoom, setZoom] = useState(false)
    const [istituto, setIstituto] = useState("")
    const [istitutoError, setIstitutoError] = useState(false)
    const [link, setLink] = useState("")
    const [linkError, setLinkError] = useState(false)
    const [corso, setCorso] = useState("")
    const [corsoError, setCorsoError] = useState(false)
    const [dataInizio, setDataInizio] = useState("")
    const [dataInizioError, setDataInizioError] = useState(false)
    const [dataFine, setDataFine] = useState(moment())
    const [dataFineError, setDataFineError] = useState(false)
    const [descrizione, setDescrizione] = useState("")
    const [descrizioneError, setDescrizioneError] = useState(false)

    const handlePress = () => {
        if (istituto.length === 0) {
            setIstitutoError(true);
        }
        else {
            setIstitutoError(false)
        }
        if (!link.match(LINK_REGEX)) {
            setLinkError(true);
        }
        else {
            setLinkError(false)
        }
        if (corso.length === 0) {
            setCorsoError(true);
        }
        else {
            setCorsoError(false)
        }
        if (descrizione.length === 0) {
            setDescrizioneError(true);
        }
        else {
            setDescrizioneError(false)
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

FormazioniScreen.navigationOptions = {
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