import React from "react"
import { StyleSheet, Image, View } from "react-native"
import { width } from "../../constants/Layout"
import { Body } from "../../components/StyledText"
import Colors from "../../constants/Colors"

export default function FeedCard({ Card }) {
    console.log(Card.description[0])
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image
                style={{ flex: 1, resizeMode: 'contain' }}
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
        width: width,
        height: 200
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