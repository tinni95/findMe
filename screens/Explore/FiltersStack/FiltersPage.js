import React, { useState } from 'react'
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { RoundFilters } from "./components/RoundFilters";
import RoundButton from '../../../components/shared/RoundButtonEmpty';
import { Settori } from "../../shared/helpers"
import { StepsLabel } from '../../shared/StepsLabel';
import { Bold } from '../../../components/StyledText';
import { FormStyles } from '../../shared/Form/FormStyles';
import { comuni } from "../../shared/comuni";

export default function FiltersPage({ navigation, settore }) {
    var regioneArray = comuni.map(comune => {
        return comune.regione
    })
    var norep = [...new Set(regioneArray)]
    settore = (navigation.getParam("settore") || [])
    const [posizioni, setPosizioni] = useState(settore);
    return (
        <View style={styles.container}>
            <ScrollView>
                <StepsLabel text={"Posizione di preferenza"}></StepsLabel>
                <RoundFilters hide addItem={item => setPosizioni([...posizioni, item])} removeItem={item => setPosizioni(posizioni.filter(i => i !== item))} settori={Settori} settoreAttivi={settore} />
                <StepsLabel text={"Regione"}></StepsLabel>
                <TouchableOpacity onPress={() => navigation.navigate("AutoComplete", { for: "Requisiti", path: "FiltersPage", items: norep })} style={FormStyles.requisiti}>
                    <Bold style={{ color: "#958C8C" }}>Cerca Regione</Bold>
                </TouchableOpacity>
                <View style={styles.buttonWrapper}>
                    <RoundButton onPress={() => {
                        navigation.navigate("Explore", {
                            settore: posizioni
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