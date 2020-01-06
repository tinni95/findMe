import React from "react"
import { View, StyleSheet } from "react-native"
import { QuestionCardAfter } from "./components/QuestionCardAfter";

export default function QuestionScreen({ navigation }) {
    const question = navigation.getParam("question");
    return <View style={styles.container}>
        <QuestionCardAfter question={question}></QuestionCardAfter>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4F4'
    },
})