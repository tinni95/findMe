import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Body, Bold } from "../../components/StyledText"
import Colors from "../../constants/Colors"
import FormazioneCard from "./FormazioneCard"
import EsperienzaCard from "./EsperienzaCard"
import ProgettoCard from "./ProgettoCard"
import TouchablePen from "./TouchablePen"
var shortid = require("shortid")

export default function ItemsBlock({ title, items, onPress }) {
    console.log(items)
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Body style={{ color: Colors.blue }}>{title}</Body>
                <TouchablePen onPress={onPress} size={15}></TouchablePen>
            </View>

            {items.length > 0 &&
                title == "Formazione" && items.map(item => {
                    return <FormazioneCard key={shortid.generate()} item={item}></FormazioneCard>
                }) ||
                title == "Esperienze" && items.map(item => {
                    return <EsperienzaCard key={shortid.generate()} item={item}></EsperienzaCard>
                }) ||
                title == "Progetti" && items.map(item => {
                    return <ProgettoCard key={shortid.generate()} item={item}></ProgettoCard>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    aggiungiButton: {
        textAlign: "center",
        color: Colors.blue
    },
    aggiungiWrapper: {
        margin: 20
    }
})