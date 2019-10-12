import React from "react";
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { width } from "../../constants/Layout";
export default class ItemCard extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <ImageBackground
                        style={styles.card}
                        source={require("../../assets/images/cardBg.png")}>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    card: {
        flex: 1,
        flexDirection: "column",
        margin: 5,
        height: 230
    }
})