import React from "react";
import Location from "../../assets/images/location.svg";
import { StyleSheet, View, Text } from "react-native";
import { Body } from "../StyledText"
import { isSmallDevice } from "../../constants/Layout"

export default function LocationWithText(props) {
    return (
        <View style={styles.container}>
            <Location height={20} width={20} fill={props.color} />
            <Body style={[styles.text, { color: props.textColor }]}>{props.location}</Body>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginLeft: -3,
        flexDirection: "row",
        margin: 5,
        marginTop: isSmallDevice ? 3 : 7
    },
    text: {
        fontSize: 15,
        marginLeft: 2,
    }
})

