import React from "react"
import { View, StyleSheet } from "react-native"
import LocationWithText from "../../../../components/shared/LocationWithText"
import { Light, Bold, Body } from "../../../../components/StyledText"
export default function Info({ nome, cognome, regione, provincia, posizione }) {
    return (
        <View style={styles.container}>
            <Bold style={{ fontSize: 16 }}>{nome + " " + cognome}</Bold>
            <LocationWithText text={regione + ", " + provincia}></LocationWithText>
            <Light style={{ fontSize: 12, marginTop: 5 }}>Posizione</Light>
            <Body style={{ fontSize: 14, marginTop: 5 }}>{posizione}</Body>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        margin: 10
    }
})