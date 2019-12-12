import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Body, Bold } from "../../../components/StyledText"
import Colors from "../../../constants/Colors"
import FormazioneCard from "../Formazioni/FormazioneCard"
import EsperienzaCard from "../Esperienze/EsperienzaCard"
import ProgettoCard from "../Progetti/ProgettoCard"
import TouchablePen from "./TouchablePen"
import UnTouchablePen from "./UnTouchablePen"
var shortid = require("shortid")

export default function ItemsBlock({ title, items, onPress }) {
    console.log(items)
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Body style={{ color: Colors.blue }}>{title}</Body>
                <UnTouchablePen size={15}></UnTouchablePen>
            </TouchableOpacity>

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