import React from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import ForumHeader from "./ForumHeader"
import { Body, Light } from "../../components/StyledText"

export default function QuestionAnswerCard({ notifica, navigation }) {
    return <TouchableOpacity onPress={() => navigation.navigate("QuestionScreen", { id: notifica.answer.question.id })} style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={require("../../assets/images/placeholder.png")} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
        <View style={styles.contentContainer}>
            <ForumHeader createdAt={notifica.createdAt} />
            <Body style={styles.title}>Qualcuno ha risposto alla tua domanda</Body>
            <Light style={styles.text}>{notifica.text}</Light>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "baseline",
        minHeight: 80,
        flexDirection: "row"
    },
    imageContainer: {
        margin: 10,
        flex: 1
    },
    contentContainer: {
        flex: 8,
        margin: 10
    },
    title: {
        fontSize: 12,
        marginBottom: 10
    },
    text: {
        fontSize: 12
    }
})