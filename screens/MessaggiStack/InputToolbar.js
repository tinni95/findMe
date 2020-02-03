import React, { useState } from "react"
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"


export default function InputToolbar({ onSend, image }) {
    const [text, setText] = useState("")
    const [displaydText, setDisplay] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={image.uri ? image : require("../../assets/images/placeholder.png")} style={styles.image} />
            </View>
            <TextInput value={displaydText} onChangeText={val => {
                setText(val)
                setDisplay(val)
            }} placeholder={"Scrivi Messaggio"} placeholderTextColor={"#818181"} multiline
                style={styles.textInput}
                onFocus={() => {
                    setDisplay(text)
                }}
                onEndEditing={() => {
                    if (text.includes("\n")) {
                        setDisplay("..." + text.replace(/\n/g, "").substring(text.length - 3, text.length))
                    }
                }}
            ></TextInput>
            <TouchableOpacity
                onPress={() => {
                    onSend(text);
                    setText("");
                    setDisplay("");
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
                elevation: -5
            }
        })
    },
    textInput: {
        maxHeight: 60,
        flex: 7,
        backgroundColor: "#F5F5F5",
        borderRadius: 5,
        padding: 5,
        fontFamily: "sequel-sans-light"
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