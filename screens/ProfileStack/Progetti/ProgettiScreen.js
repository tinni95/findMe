import React from "react"
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native"
import Colors from "../../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import Aggiungi from "../shared/Aggiungi"
let shortid = require("shortid")
import ProgettoEditCard from "./ProgettoEditCard"
import HeaderStyles from "../../shared/HeaderStyles"

export default function ProgettiScreen({ navigation }) {
    const progetti = navigation.getParam("progetti")
    return (
        <View style={styles.container}>
            <Aggiungi onPress={() => navigation.navigate("ProgettiEditScreen")} text={"Progetto"} />
            {progetti.map(progetto => {
                return <ProgettoEditCard navigation={navigation} key={shortid.generate()} progetto={progetto} />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    aggiungiWrapper: {
        height: 65,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#707070",
        borderBottomWidth: 0.3
    },
    aggiungiText: {
        color: Colors.blue,
        fontSize: 12
    }
})

ProgettiScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Progetti",
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle,
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}