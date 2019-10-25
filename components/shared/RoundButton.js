import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avenir } from "../StyledText"
import { isSmallDevice } from "../../constants/Layout"
export default function RoundButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.container, { backgroundColor: props.color, width: props.isLong ? 200 : undefined }]}>
                <Avenir style={styles.text}>{props.text}</Avenir>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        alignSelf: 'flex-start',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    text: {
        color: "white",
        fontSize: isSmallDevice ? 11 : 13,
        marginLeft: 2,
    }
})