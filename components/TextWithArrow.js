import React from "react";
import { AvenirText } from "./StyledText";
import { View, StyleSheet } from "react-native";
import Arrow from "../assets/images/arrow.svg";


export default TextWithArrow = ({ text, color }) => {
    return (
        <View style={styles.container}>
            <AvenirText style={[styles.text, { color }]}>{text}</AvenirText>
            <View style={styles.spacer} />
            <Arrow width={30} height={30} fill={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    spacer: {
        width: 10
    },
    text: {
        fontSize: 25,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})