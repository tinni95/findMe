import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Body } from "../../components/StyledText"
import Colors from "../../constants/Colors"
import FormazioneCard from "./FormazioneCard"
import EsperienzaCard from "./EsperienzaCard"
import ProgettoCard from "./ProgettoCard"
var shortid = require("shortid")

export default function ItemsBlock({ title, items }) {
    console.log(items)
    return (
        <View>
            <Body style={{ color: Colors.blue }}>{title}</Body>
            {
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
    }
})