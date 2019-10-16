import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FieldIcon from "./FieldIcon";

export default function FieldIconRound(props) {
    return (
        <View style={styles.container}>
            <View style={[styles.circle, { backgroundColor: props.bg }]}>
                <FieldIcon
                    {...props}
                />
            </View>
            {props.available > 1 ?
                <Text style={styles.bottomText}>{props.available}</Text>
                : null}

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    circle: {
        marginLeft: 2,
        marginRight: 4,
        alignItems: "center",
        height: 33,
        width: 33,
        borderRadius: 20
    },
    bottomText: {
        fontSize: 10,
        marginTop: 23,
        marginLeft: -5
    }
})