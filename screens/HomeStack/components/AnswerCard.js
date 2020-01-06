import React from "react"
import { View, StyleSheet } from "react-native"
import { AvatarAndTime } from "./AvatarAndTime";
import { width } from "../../../constants/Layout";
import { Light } from "../../../components/StyledText";

export default function AnswerCard({ question, answer }) {
    return (
        <View style={styles.container}>
            <AvatarAndTime text={"Ha risposto "} question={answer}></AvatarAndTime>
            <View style={styles.content}>
                <Light>{answer.text}</Light>
            </View>
            <View style={styles.footer}>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignSelf: 'baseline',
        backgroundColor: "white",
        marginBottom: 5,
        paddingBottom: 5,
        width: width
    },
    content: {
        justifyContent: "flex-start",
        marginLeft: 20
    },
    footer: {
        flexDirection: "row",

    }
})