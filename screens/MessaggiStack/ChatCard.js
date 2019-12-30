import React from "react"
import { View, StyleSheet, Image } from "react-native"
import { Body } from "../../components/StyledText"

export default function ChatCard({ chat }) {

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/placeholder.png")} style={{ width: 100, height: 100, borderRadius: 50 }} />
            </View>
            <View style={styles.textContainer}>
                <Body>Gianni</Body>
                <Body>s</Body>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    textContainer: {
        flexDirection: "column"
    }
})