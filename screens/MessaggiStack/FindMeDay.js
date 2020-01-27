import React from "react"
import { Body } from "../../components/StyledText"
import { StyleSheet, View } from "react-native"
import { width } from "../../constants/Layout"
import moment from 'moment/min/moment-with-locales'
moment.locale("it")

export default function FindMeDay(props) {
    console.log(moment(props.previousMessage.createdAt).isAfter(moment(props.currentMessage.createdAt)))
    if (moment(props.previousMessage.createdAt).isAfter(moment(props.currentMessage.createdAt)))
        return <View style={styles.container}>
            <Body>Aoh</Body>
        </View>
    else
        return null
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: width,
        backgroundColor: "blue"
    }
})