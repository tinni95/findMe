import React from "react";
import Location from "../../assets/images/location.svg";
import { StyleSheet, View, Text } from "react-native";

export default function LocationWithText(props) {
    return (
        <View style={styles.container}>
            <Location height={20} width={20} fill={props.color} />
            <Text style={{ marginTop: 3, marginLeft: 2, color: props.textColor }}>{props.text}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 5
    },
})