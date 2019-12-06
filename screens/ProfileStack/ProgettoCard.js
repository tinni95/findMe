import React from "react"
import { View, StyleSheet, Image } from "react-native";
import { Body, Bold } from "../../components/StyledText";

export default function ProgettoCard({ item }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={{ height: 28, width: 18 }} source={require("../../assets/images/lamp.png")}></Image>
            </View>
            <View style={styles.textContainer}>
                <View style={{ flexDirection: "column", textAlign: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Body style={styles.textHeader}>Heriot-Wattsapp</Body>
                        <Body style={styles.textDate}>Giu 2019 - Set 2019</Body>
                    </View>
                    <Bold style={styles.textSubHeader}>Di Gruppo</Bold>
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