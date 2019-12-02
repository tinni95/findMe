import React from "react"
import { View, StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
import { Body } from "../../components/StyledText"

export default function CategoriaItem(props) {
    return (
        <View style={[{ backgroundColor: props.isActive ? Colors.blue : "white" }, styles.container]}>
            <Body style={{ color: props.isActive ? "white" : Colors.grey }}>{props.children}</Body>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.grey,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 7.5,
        paddingRight: 15,
        paddingLeft: 15,
        margin: 10
    }
})