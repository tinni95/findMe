import React, { useState } from "react"
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"


export default function InputToolbar({ onSend }) {
    const [text, setText] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/placeholder.png")} style={styles.image} />
            </View>
            <TextInput value={text} onChangeText={val => setText(val)} placeholder={"Scrivi Messaggio"} multiline style={styles.textInput}></TextInput>
            <TouchableOpacity onPress={() => {
                onSend(text);
                setText("")
            }} style={styles.imageContainer}>
                <Ionicons name={"ios-send"} size={28} ></Ionicons>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: 5,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        })
    },
    textInput: {
        height: 35,
        flex: 7,
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        padding: 5,
        fontFamily: "sequel-sans"
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 17.5
    },
    imageContainer: {
        flex: 1.5,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    }
})