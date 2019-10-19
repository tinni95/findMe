import React from "react";
import { StyleSheet, View } from "react-native";
import { Avenir } from "../StyledText"
import { isSmallDevice } from "../../constants/Layout"
export default function RoundButton(props) {
    return (
        <View style={styles.container}>
            <Avenir style={styles.text}>{props.text}</Avenir>
        </View>
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