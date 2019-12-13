import React, { useState } from 'react'
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import { RoundFilters } from "./components/RoundFilters";
import RoundButton from '../../../components/shared/RoundButtonEmpty';
import { Settori } from "../../shared/helpers"
import { StepsLabel } from '../../shared/StepsLabel';

export default function FiltersPage({ navigation, settore, positione }) {

    settore = Platform == "web" ? (settore ? settore : []) : (navigation.getParam("settore") || [])
    posizione = (navigation.getParam("posizione") || [])
    const [settori, setSettori] = useState(settore);
    const [posizioni, setPosizioni] = useState(posizione);
    return (
        <View style={styles.container}>
            <ScrollView>
                <StepsLabel text={"Posizione di preferenza"}></StepsLabel>
                <RoundFilters hide addItem={item => setPosizioni([...posizioni, item])} removeItem={item => setPosizioni(posizioni.filter(i => i !== item))} settori={Settori} settoreAttivi={settore} />
                <View style={styles.buttonWrapper}>
                    <RoundButton onPress={() => {
                        navigation.navigate("Explore", {
                            settore: settori
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
    }

})