import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { RoundFilters } from "./components/RoundFilters";
import RoundButton from '../../../components/shared/RoundButtonEmpty';
import { Settori } from "../../shared/helpers"
import { StepsLabel } from '../../shared/StepsLabel';
import { Bold } from '../../../components/StyledText';
import { FormStyles } from '../../shared/Form/FormStyles';
import { comuni } from "../../shared/comuni";

export default function FiltersPage({ navigation, settore }) {
    const passedItem = navigation.getParam("title") || null
    useEffect(() => {
        passedItem ? setRegione(passedItem) : null
    })
    var regioneArray = comuni.map(comune => {
        return comune.regione
    })
    var norep = [...new Set(regioneArray)]
    settore = (navigation.getParam("settore") || [])
    const [posizioni, setPosizioni] = useState(settore);
    const [regione, setRegione] = useState("");

    return (
        <View style={styles.container}>
            <ScrollView>
                <StepsLabel text={"Posizione di preferenza"}></StepsLabel>
                <RoundFilters hide addItem={item => setPosizioni([...posizioni, item])} removeItem={item => setPosizioni(posizioni.filter(i => i !== item))} settori={Settori} settoreAttivi={settore} />
                <StepsLabel text={"Regione"}></StepsLabel>
                <TouchableOpacity onPress={() => navigation.navigate("AutoComplete", { for: "Requisiti", path: "FiltersPage", items: norep })} style={FormStyles.requisiti}>
                    <Bold style={{ color: regione == "" ? "#958C8C" : "black" }}>{regione == "" ? "Cerca Regione" : regione}</Bold>
                </TouchableOpacity>
                <View style={styles.buttonWrapper}>
                    <RoundButton onPress={() => {
                        console.log(regione)
                        navigation.navigate("Explore", {
                            settore: posizioni,
                            regione
                        })
                    }}
                        color={"#5EDDDC"} text={"APPLICA"} />
                </View>
            </ScrollView>
        </View>
    )
}
FiltersPage.navigationOptions = {
    title: "Filtri",
    headerTintColor: '#5F5E5E',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    buttonWrapper: {
        flex: 1,
        alignSelf: "center"
    },
    locationInput: {
        width: "100%"
    }

})