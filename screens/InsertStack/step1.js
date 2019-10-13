import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default InsertFirstScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.header}
                source={require('../../assets/images/header.png')}
                resizeMode="contain"
            />
            <TouchableOpacity style={styles.button}>
                <Text>Seleziona una Categoria</Text>
            </TouchableOpacity>
        </View>)
}

InsertFirstScreen.navigationOptions = {
    header: null
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBEBEB"
    },
    header: {
        flex: 5,
        height: undefined,
        width: undefined
    },
    button: {
        flex: 1,
        alignItems: "center"
    }
})