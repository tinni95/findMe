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