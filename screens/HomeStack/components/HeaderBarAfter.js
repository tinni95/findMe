import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Light, Body } from "../../../components/StyledText"
import Colors from "../../../constants/Colors"

export default function HeaderBarAfter({ navigation, onPress }) {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("QuestionScreen")}>
                <Ionicons
                    style={{ marginLeft: 25 }}
                    name={"md-close"}
                    size={25}
                    color={"black"} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Light>Rispondi</Light>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
                <Ionicons
                    name={"ios-send"}
                    size={25}
                    color={Colors.blue} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBar: {
        borderBottomWidth: 0.3,
        borderBottomColor: "grey",
        height: 40,

        marginBottom: 20,
        flexDirection: "row"
    },
    arrow: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    },
    titleContainer: {
        flex: 9,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    },
    buttonContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    }
});
