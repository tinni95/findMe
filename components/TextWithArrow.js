import React from "react";
import { AvenirText } from "./StyledText";
import { View, StyleSheet } from "react-native";
import Arrow from "../assets/images/arrow.svg";


export default TextWithArrow = ({ text, color }) => {
    return (
        <View style={styles.container}>
            <AvenirText style={{ color, fontSize: 25, fontWeight: "bold" }}>{text}</AvenirText>
            <Arrow width={30} height={30} fill={"blue"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})