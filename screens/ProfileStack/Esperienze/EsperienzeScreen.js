import React from "react"
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native"
import Colors from "../../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import Aggiungi from "../shared/Aggiungi"
let shortid = require("shortid")
import EsperienzaEditCard from "./EsperienzaEditCard"

export default function EsperienzeScreen({ navigation }) {
    const esperienze = navigation.getParam("esperienze")
    return (
        <View style={styles.container}>
            <Aggiungi onPress={() => navigation.navigate("EsperienzeEditScreen")} text={"ESPERIENZA"} />
            {esperienze.map(esperienza => {
                return <EsperienzaEditCard navigation={navigation} key={shortid.generate()} esperienza={esperienza} />
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

EsperienzeScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "ESPERIENZE",
        headerStyle: {
            ...Platform.select({
                ios: {
                    shadowColor: "black",
                    shadowOffset: { height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3
                },
                android: {
                    elevation: 20
                },
            })
        },
        headerTitleStyle: {
            fontFamily: "sequel-sans-bold",
            color: Colors.blue,
            fontSize: 12
        },
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