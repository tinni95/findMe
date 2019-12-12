import React from "react"
import { View, StyleSheet, Image } from "react-native";
import { Body, Bold } from "../../../components/StyledText";

export default function ProgettoCard({ item, noBorder }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={{ height: 28, width: 18 }} source={require("../../../assets/images/lamp.png")}></Image>
            </View>
            <View style={[styles.textContainer, noBorder]}>
                <View style={{ flexDirection: "column", textAlign: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Body style={styles.textHeader}>{item.titolo}</Body>
                        <Body style={styles.textDate}>{item.dataInizio} - {item.dataFine}</Body>
                    </View>
                    <Bold style={styles.textSubHeader}>{item.sottoTitolo}</Bold>
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