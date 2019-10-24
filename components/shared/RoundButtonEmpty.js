import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Bold } from "../StyledText"
import { isSmallDevice } from "../../constants/Layout"
export default function RoundButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Bold style={styles.text}>{props.text}</Bold>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 25,
        borderColor: "#60E1E0",
        borderWidth: 1,
        padding: 15,

    },
    text: {
        color: "white",
        fontSize: isSmallDevice ? 11 : 13,
        marginLeft: 2,
    }
})