import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avenir } from "../StyledText"
import { isSmallDevice } from "../../constants/Layout"
export default function RoundButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.container, { backgroundColor: props.color }]}>
                <Avenir style={styles.text}>{props.text}</Avenir>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: "#60E1E0",
        alignSelf: 'flex-start',
        padding: 10
    },
    text: {
        color: "white",
        fontSize: isSmallDevice ? 12 : 15,
        marginLeft: 2,
    }
}) 