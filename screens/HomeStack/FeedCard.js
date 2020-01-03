import React from "react"
import { StyleSheet, Image, View, Platform } from "react-native"
import { width, isBigDevice } from "../../constants/Layout"
import { Body } from "../../components/StyledText"
import Colors from "../../constants/Colors"

export default function FeedCard({ Card }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image
                style={{ flex: 1, resizeMode: 'cover' }}
                source={{ uri: Card.description[0] }}></Image>
            <View style={styles.mainContent}>
                <Body style={styles.url}>Ilsole24ore.com</Body>
                <Body style={styles.title}>{Card.title[0]}</Body>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: isBigDevice ? "50%" : "100%",
        height: 250,
        margin: 25,
        padding: 25,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: -15 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            },
            web: {
                shadowColor: "black",
                shadowOffset: { height: -15 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            }
        })
    },
    mainContent: {
        alignItems: "flex-start"
    },
    url: {
        fontSize: 18,
        color: "#707070"
    },
    title: {
        fontSize: 24,
        color: Colors.blue
    }
})