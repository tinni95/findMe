import React, { useState } from "react";
import { View, StyleSheet } from "react-native"
import WithErrorString from "../shared/Form/WithErrorString";
import StepsLabel, { StepsLabelWithHint } from "../shared/StepsLabel";
import FormTextInput from "../shared/Form/FormTextInput";
import { FormStyles } from "../shared/Form/FormStyles";
import RoundButton from "../../components/shared/RoundButton";
import Colors from "../../constants/Colors";
const LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export default function FormazioniScreen({ navigation }) {
    const [istituto, setIstituto] = useState("")
    const [istitutoError, setIstitutoError] = useState(false)
    const [link, setLink] = useState("")
    const [linkError, setLinkError] = useState(false)
    const [corso, setCorso] = useState("")
    const [corsoError, setCorsoError] = useState(false)
    const [dataInizio, setDataInizio] = useState("")
    const [dataFine, setDataFine] = useState("")
    const [descrizione, setDescrizione] = useState("")

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
    }

    return (
        <View style={styles.container}>
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
                    value={linkError}
                    style={istitutoError ? FormStyles.inputError : FormStyles.input}
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
            <View style={styles.buttonWrapper}>
                <RoundButton onPress={() => handlePress()} text={"CONFERMA"} color={Colors.blue} textColor="white"></RoundButton>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: { flex: 1, margin: 20 },
    buttonWrapper: {
        alignItems: "center",
        margin: 35
    },
    separator: { height: 20 }
})