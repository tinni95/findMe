import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import TextWithArrow from "../../components/TextWithArrow";
import { Button } from 'react-native-paper';
import { width } from "../../constants/Layout"
export default LandingPage = ({ navigation: { navigate } }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.header}
                source={require('../../assets/images/fmlogo.png')}
                resizeMode="contain"
            />
            <View style={styles.buttonWrapper}>
                <Button style={styles.button} mode="contained" onPress={() => navigate("SignUpScreen")}>
                    Sign Up
            </Button>
                <TouchableOpacity onPress={() => navigate("LoginScreen")} style={styles.loginWrapper}>
                    <Text style={styles.loginPrompt}>Already a member? Login</Text>
                </TouchableOpacity>
            </View>
        </View>)
}

LandingPage.navigationOptions = {
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
    buttonWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: width - 40,
        backgroundColor: "#7CEA9C",
        padding: 5
    },
    loginWrapper: {
        marginTop: 20,
    },
    loginPrompt: {
        color: "white",
        fontFamily: "Avenir",
        fontSize: 20,
    }
})