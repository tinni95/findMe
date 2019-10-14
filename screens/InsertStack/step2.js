import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { width } from "../../constants/Layout"
export default InsertSecondScreen = ({ navigation: { navigate } }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.header}
                source={require('../../assets/images/header.png')}
                resizeMode="contain"
            />
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
        flex: 1,
        height: 5,
        width
    },
    button: {
        flex: 1,
        alignItems: "center"
    }
})