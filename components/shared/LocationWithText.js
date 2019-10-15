import React from "react";
import Location from "../../assets/images/location.svg";
import { StyleSheet, View, Text } from "react-native";

export default function LocationWithText(props) {
    return (
        <View style={styles.container}>
            <Location height={20} width={20} fill={props.color} />
            <Text style={[styles.text, { color: props.textColor }]}>{props.text}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginLeft: -3,
        flexDirection: "row",
        margin: 5
    },
    text: {
        fontSize: 15,
        marginTop: 3,
        marginLeft: 2,
    }
})