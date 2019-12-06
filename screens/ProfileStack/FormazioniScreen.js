import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native"
import WithErrorString from "../shared/Form/WithErrorString";
import StepsLabel, { StepsLabelWithHint } from "../shared/StepsLabel";
import FormTextInput from "../shared/Form/FormTextInput";
import { FormStyles } from "../shared/Form/FormStyles";
import RoundButton from "../../components/shared/RoundButton";
import Colors from "../../constants/Colors";
import MonthSelectorCalendar from 'react-native-month-selector';
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment/min/moment-with-locales'
moment.locale('it')
const LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export default function FormazioniScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
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
                    value={link}
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
            <View style={FormStyles.inputHalfsContainer}>
                <View style={FormStyles.inputHalfContainer}>
                    <WithErrorString errorText={"Cambo Obbligatorio"}
                        error={dataInizioError}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <FormTextInput
                                pointerEvents="none"
                                style={dataInizioError ? FormStyles.inputHalfError : FormStyles.inputHalf}
                                placeholder="Data Inizio"
                                placeholderTextColor="#ADADAD"
                            />
                        </TouchableOpacity>
                    </WithErrorString>
                </View>
                <View style={FormStyles.inputHalfContainer}>
                    <WithErrorString errorText={"Campo Obbligatorio"} error={dataFineError}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <FormTextInput
                                style={dataFineError ? FormStyles.inputHalfError : FormStyles.inputHalf}
                                pointerEvents="none"
                                placeholder="Data Fine"
                                value={moment(dataFine).format("MMM YYYY")}
                                placeholderTextColor="#ADADAD"
                            />
                        </TouchableOpacity>
                    </WithErrorString>
                </View>
                <Modal
                    visible={modalVisible}
                    transparent={false}
                    onRequestClose={() => setModalVisible(false)}>
                    <MonthSelectorCalendar
                        localeSettings={"es"}
                        localeLanguage={"es"}
                        selectedDate={dataFine}
                        onMonthTapped={(date) => {
                            setModalVisible(false);
                            setDataFine(moment(date))
                        }}
                    />
                </Modal>
            </View>
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