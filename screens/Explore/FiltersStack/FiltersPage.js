import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { RoundFilters } from "./components/RoundFilters";
import RoundButton from '../../../components/shared/RoundButtonEmpty';
import { Settori } from "../../shared/helpers"
import { StepsLabel } from '../../shared/StepsLabel';
import { Bold } from '../../../components/StyledText';
import { FormStyles } from '../../shared/Form/FormStyles';
import { comuni } from "../../shared/comuni";
import { Ionicons } from '@expo/vector-icons';
import RoundButtonEmpty2 from '../../../components/shared/RoundButtonEmpty2';
import Colors from "../../../constants/Colors"

export default function FiltersPage({ navigation, settore }) {
    var regioneArray = comuni.map(comune => {
        return comune.regione
    })
    var regioni = [...new Set(regioneArray)]
    const removeUndefined = (list) => {
        return list.filter(i => i != undefined)
    }
    const provincie = (regione) => {
        var provinciaArray = comuni.map(comune => {
            if (comune.regione == regione) {
                return comune.provincia
            }
        })
        return removeUndefined([...new Set(provinciaArray)])
    }
    const comunis = (provincia) => {
        var comuniArray = comuni.map(comune => {
            if (comune.provincia == provincia) {
                return comune.città
            }
        })
        return removeUndefined([...new Set(comuniArray)])
    }

    const passedItem = navigation.getParam("title") || null
    const is = navigation.getParam("is") || null
    useEffect(() => {
        if (passedItem) {
            if (is == "regione") {
                setRegione(passedItem)
            }
            if (is == "provincia") {
                setProvincia(passedItem)
            }
            if (is == "comune") {
                setComune(passedItem)
            }
        }
    })
    settore = (navigation.getParam("settore") || [])
    const [posizioni, setPosizioni] = useState(settore);
    const [regione, setRegione] = useState(null);
    const [provincia, setProvincia] = useState(null);
    const [comune, setComune] = useState(null);

    return (
        <View style={styles.container}>
            <ScrollView>
                <StepsLabel text={"Posizione di preferenza"}></StepsLabel>
                <RoundFilters hide addItem={item => setPosizioni([...posizioni, item])} removeItem={item => setPosizioni(posizioni.filter(i => i !== item))} settori={Settori} settoreAttivi={settore} />
                <StepsLabel text={"Regione"}></StepsLabel>
                <TouchableOpacity onPress={() => navigation.navigate("AutoComplete", { is: "regione", for: "Requisiti", path: "FiltersPage", items: regioni })} style={FormStyles.requisiti}>
                    <Bold style={[{ color: !regione ? "#958C8C" : "black", fontSize: 12, marginTop: 2.5 }]}>{!regione ? "Cerca Regione" : regione}</Bold>
                </TouchableOpacity>
                <StepsLabel text={"Provincia"}></StepsLabel>
                <TouchableOpacity onPress={() => regione && navigation.navigate("AutoComplete", { is: "provincia", for: "Requisiti", path: "FiltersPage", items: provincie(regione) })} style={FormStyles.requisiti}>
                    <Bold style={{ opacity: regione ? 1 : 0.2, color: !provincia ? "#958C8C" : "black", fontSize: 12, marginTop: 2.5 }}>{!provincia ? "Cerca Provincia" : provincia}</Bold>
                </TouchableOpacity>
                <StepsLabel text={"Comune"}></StepsLabel>
                <TouchableOpacity onPress={() => provincia && navigation.navigate("AutoComplete", { is: "comune", for: "Requisiti", path: "FiltersPage", items: comunis(provincia) })} style={FormStyles.requisiti}>
                    <Bold style={{ fontSize: 12, marginTop: 2.5, opacity: provincia ? 1 : 0.2, color: !comune ? "#958C8C" : "black" }}>{!comune ? "Cerca Comune" : comune}</Bold>
                </TouchableOpacity>
                <View style={styles.buttonWrapper}>
                    <RoundButtonEmpty2 onPress={() => {
                        navigation.navigate("Explore", {
                            settore: posizioni,
                            regione,
                            provincia,
                            comune
                        })
                    }}
                        textColor={Colors.blue}
                        color={Colors.blue} text={" Applica "} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    buttonWrapper: {
        margin: 20,
        marginTop: 40,
        alignSelf: "center"
    },
    locationInput: {
        width: "100%"
    }

})