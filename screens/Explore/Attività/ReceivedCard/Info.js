import React from "react"
import { View, StyleSheet } from "react-native"
import LocationWithText from "../../../../components/shared/LocationWithText"
import { Light, Bold, Body } from "../../../../components/StyledText"
import Colors from "../../../../constants/Colors"
export default function Info({ nome, cognome, regione, comune, posizione }) {
    return (
        <View style={styles.container}>
            <Bold style={{ fontSize: 16 }}>{nome + " " + cognome}</Bold>
            {comune ?
                <LocationWithText points={17} style={{ marginTop: -3 }} comune={comune} regione={regione}></LocationWithText>
                :
                <View style={{ height: 30 }} />
            }
            <Body style={{ fontSize: 14, marginTop: 15, color: Colors.blue }}>Posizione</Body>
            <Light style={{ fontSize: 12, marginTop: 5 }}>{posizione}</Light>
            <Body style={{ fontSize: 14, marginTop: 15 }}>Titolo post</Body>
            <Light style={{ fontSize: 12, marginTop: 5, color: Colors.blue }}>Sviluppo App</Light>
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