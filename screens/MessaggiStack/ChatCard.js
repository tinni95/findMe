import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Body, Light } from "../../components/StyledText"
import { fixOverflow } from "../../shared/HelperFunctions"
import moment from 'moment/min/moment-with-locales'
import { useState } from "react"
moment.locale('it');

export default function ChatCard({ chat, isSub, onPress }) {
    const lastMessageIndex = chat.messages.length - 1;
    const image = isSub ? chat.sub.pictureUrl ? { uri: chat.sub.pictureUrl } : require("../../assets/images/placeholder.png") : chat.pub.pictureUrl ? { uri: chat.pub.pictureUrl } : require("../../assets/images/placeholder.png")

    const backgroundColor = () => {
        if (isSub) {
            if (chat.subRead)
                return "white"
            else return "#EBEBEB"
        }
        else {
            if (chat.pubRead)
                return "white"
            else return "#EBEBEB"
        }
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: backgroundColor() }]}>
            <View style={styles.imageContainer}>
                <Image source={image} style={{ width: 60, height: 60, borderRadius: 30 }} />
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