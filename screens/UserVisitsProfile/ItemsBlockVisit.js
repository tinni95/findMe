import React from "react"
import { View, StyleSheet } from "react-native"
import FormazioneCard from "../ProfileStack/Formazioni/FormazioneCard"
import EsperienzaCard from "../ProfileStack/Esperienze/EsperienzaCard"
import ProgettoCard from "../ProfileStack/Progetti/ProgettoCard"
import { Body } from "../../components/StyledText"
import Colors from "../../constants/Colors"
var shortid = require("shortid")

export default function ItemsBlockVisit({ title, items }) {
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Body style={{ color: Colors.blue }}>{title}</Body>
            </View>

            {items.length > 0 &&
                title == "Formazione" && items.map(item => {
                    return <FormazioneCard key={shortid.generate()} item={item} />
                }) ||
                title == "Esperienze" && items.map(item => {
                    <EsperienzaCard key={shortid.generate()} item={item} />
                }) ||
                title == "Progetti" && items.map(item => {
                    <ProgettoCard key={shortid.generate()} item={item} />
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