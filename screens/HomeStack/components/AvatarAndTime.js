import React from "react"
import { View, Image, StyleSheet } from "react-native"
import moment from 'moment/min/moment-with-locales'
import { Body, Light } from "../../../components/StyledText";
moment.locale('it');

export const AvatarAndTime = ({ question, text }) => {
    return (
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image source={require("../../../assets/images/placeholder.png")} style={{ width: 40, height: 40, borderRadius: 20 }} />
            </View>
            <View style={styles.content}>
                <Body style={styles.person}>{question.postedBy.nome + " " + question.postedBy.cognome}</Body>
                <Light style={styles.date}>{text + moment(question.createdAt).fromNow()}</Light>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 2,
        flexDirection: 'row',
        alignContent: "center",
    },
    imageContainer: {
        margin: 10,
        marginTop: 5
    },
    person: {
        margin: 10,
        fontSize: 11,
        marginTop: 5,
        marginBottom: 5
    },
    date: {
        marginLeft: 10,
        fontSize: 9,
        color: "#707070"
    },
    content: {
        marginTop: 5,
        flexDirection: "column"
    },
})