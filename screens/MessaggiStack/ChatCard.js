import React from "react"
import { View, StyleSheet, Image } from "react-native"
import { Body, Light } from "../../components/StyledText"

export default function ChatCard({ chat }) {
    console.log("chat", chat)
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/placeholder.png")} style={{ width: 50, height: 50, borderRadius: 25 }} />
            </View>
            <View style={styles.textContainer}>
                <Body style={styles.nome}>{chat.sub.nome}</Body>
                <View style={{ height: 5 }}></View>
                <Body style={styles.message}>s</Body>
            </View>
            <View style={styles.dateContainer}>
                <Light style={styles.date}>Sab</Light>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 80,
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 0.3,
        borderTopColor: "#E5E5E5",
        borderTopWidth: 0.3
    },
    dateContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    imageContainer: {
        justifyContent: "center",
        margin: 10
    },
    textContainer: {
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center"
    },
    nome: {
        fontSize: 12
    },
    date: {
        fontSize: 11,
        color: "#6E5A5A",
        margin: 20
    },
    nome: {
        fontSize: 11,
        color: "#6E5A5A"
    }
})