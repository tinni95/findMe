import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Light, Body } from "../../components/StyledText"
import Colors from "../../constants/Colors"

export default function HeaderBar({ navigation, onPress }) {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("HomeScreen")}>
                <Ionicons
                    style={{ marginLeft: 25 }}
                    name={"md-close"}
                    size={25}
                    color={"black"} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Light>Fai una domanda</Light>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
                <Body style={{ color: Colors.blue }}>Pubblica</Body>
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
