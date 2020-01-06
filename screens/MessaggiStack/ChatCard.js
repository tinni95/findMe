import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Body, Light } from "../../components/StyledText"
import { fixOverflow } from "../../shared/HelperFunctions"
import moment from 'moment/min/moment-with-locales'
moment.locale('it');

export default function ChatCard({ chat, isSub, onPress }) {
    const lastMessageIndex = chat.messages.length - 1;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/placeholder.png")} style={{ width: 60, height: 60, borderRadius: 30 }} />
            </View>
            <View style={styles.textContainer}>
                <Body style={styles.nome}>{isSub ? chat.pub.nome : chat.sub.nome}</Body>
                <View style={{ height: 5 }}></View>
                <Body style={styles.message}>{fixOverflow(chat.messages[lastMessageIndex].text)}</Body>
            </View>
            <View style={styles.dateContainer}>
                <Light style={styles.date}>{moment(chat.messages[lastMessageIndex].createdAt).fromNow()}</Light>
            </View>
        </TouchableOpacity>)
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
        marginLeft: 20,
        justifyContent: "center",
        margin: 10
    },
    textContainer: {
        marginLeft: 10,
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
    message: {
        fontSize: 11,
        color: "#6E5A5A"
    }
})