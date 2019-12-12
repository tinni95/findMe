import React from "react"
import { View, StyleSheet, Image } from "react-native";
import { Body, Bold } from "../../../components/StyledText";

export default function FormazioneCard({ item }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={{ height: 23, width: 27 }} source={require("../../../assets/images/hat.png")}></Image>
            </View>
            <View style={styles.textContainer}>
                <View style={{ flexDirection: "column", textAlign: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Body style={styles.textHeader}>{item.corso}</Body>
                        <Body style={styles.textDate}>{item.dataInizio}- {item.dataFine}</Body>
                    </View>
                    <Bold style={styles.textSubHeader}>{item.istituto}</Bold>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 12
    },
    textDate: {
        fontSize: 10
    },
    textSubHeader: {
        fontSize: 10,
        color: "#958C8C",
        marginTop: 5
    },
    container: {
        flexDirection: "row",
        margin: 5,
        marginTop: 20
    },
    imageContainer: {
        flex: 0.18,
        alignContent: "center",
        marginTop: 5
    },
    textContainer: {
        borderBottomColor: "grey", borderBottomWidth: 0.3, flex: 1, paddingBottom: 15
    }
})