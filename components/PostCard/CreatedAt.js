import React from "react";
import { StyleSheet, View } from "react-native"
import Clock from "../../assets/images/clock.svg"
import { Body } from "../StyledText"

export default CreatedAt = () => {
    return (
        <View style={styles.container}>
            <Clock
                width={20} height={20}
                fill={"#00B6BE"}
            />
            <Body style={styles.text}>1 ora fa</Body>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontSize: 10,
        marginLeft: 5
    }
});



