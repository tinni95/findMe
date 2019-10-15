import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default InsertFirstScreen = ({ navigation: { navigate } }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.header}
                source={require('../../assets/images/header.png')}
                resizeMode="contain"
            />
            <TouchableOpacity onPress={() => navigate("InsertSecondScreen")} style={styles.button}>
            </TouchableOpacity>
        </View>)
}

InsertFirstScreen.navigationOptions = {
    header: null
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#02394D"
    },
    header: {
        flex: 3,
        height: undefined,
        width: undefined
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255,0.2)"
    }
})