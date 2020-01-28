import React from "react"
import { View, Image, StyleSheet } from "react-native"
import moment from 'moment/min/moment-with-locales'
import { Body, Light } from "../../../components/StyledText";
moment.locale('it');

export default AvatarAndTimeQuestion = ({ question, text }) => {
    const image = question.postedBy.pictureUrl ? { uri: question.postedBy.pictureUrl } : require("../../../assets/images/placeholder.png")
    return (

        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image source={require(image)} style={{ width: 50, height: 50, borderRadius: 25 }} />
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
        alignSelf: 'baseline',
        flexDirection: 'row',
        alignContent: "center",
    },
    imageContainer: {
        margin: 10,
        marginTop: 5
    },
    person: {
        margin: 10,
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5
    },
    date: {
        marginLeft: 10,
        fontSize: 11,
        color: "#707070"
    },
    content: {
        marginTop: 5,
        flexDirection: "column"
    },
})