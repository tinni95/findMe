import React from "react";
import Location from "../../assets/images/location.svg";
import { StyleSheet, View, Text } from "react-native";
import { Body } from "../StyledText"
import { isSmallDevice } from "../../constants/Layout"

export default function LocationWithText(props) {
    return (
        <View style={[styles.container, props.style]}>
            <Location height={props.points} width={props.points} fill={"#DD1E63"} />
            <Body style={[styles.text, { fontSize: props.fontSize }]}>{props.location}</Body>
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
        color: "#AFA9A9",
        fontSize: 15,
        marginLeft: 2,
    }
})

