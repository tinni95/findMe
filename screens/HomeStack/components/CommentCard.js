import React from "react"
import { View, Platform, StyleSheet, Image, TouchableOpacity } from "react-native"
import moment from 'moment/min/moment-with-locales'
import { width } from "../../../constants/Layout";
import { Body, Light } from "../../../components/StyledText";
moment.locale('it');

export default function CommentCard({ comment, onLongPress }) {
    console.log(comment)
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../../assets/images/placeholder.png")} style={{ width: 30, height: 30, borderRadius: 15 }} />
            </View>
            <TouchableOpacity onLongPress={onLongPress} style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Body style={styles.nome}>{comment.postedBy.nome + " " + comment.postedBy.cognome}</Body>
                        <Light style={styles.occupazione}>App developer</Light>
                    </View>
                    <View style={styles.body}>
                        <Light style={styles.date}>{moment(comment.createdAt).fromNow()}</Light>
                    </View>
                    <View style={styles.footer}>

                    </View>
                </View>
                <Light style={styles.comment}>{comment.text}</Light>
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20
    },
    imageContainer: {
        margin: 15,
        marginTop: 0
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    comment: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 3
    },
    title: {
        flexDirection: "column"
    },
    nome: {
        fontSize: 11
    },
    occupazione: {
        fontSize: 10
    },
    date: {
        fontSize: 9
    },
    body: {
        marginLeft: 3,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flex: 1
    },
    card: {
        padding: 5,
        width: width - 100,
        borderRadius: 2.5,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        })
    }
})