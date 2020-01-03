import React from "react"
import { Image, StyleSheet, TouchableOpacity, Platform } from "react-native"
import Colors from "../constants/Colors"

export default function CreateButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../assets/images/Pen_white.png")}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 35,
        height: 35
    },
    container: {
        margin: 10,
        marginRight: 15,
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: Colors.ocean,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            },
        }),
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})
