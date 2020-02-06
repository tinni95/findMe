import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Light } from "../../../components/StyledText"

export default function HeaderBarComments({ navigation, text }) {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
                <Ionicons
                    style={{ marginLeft: 25 }}
                    name={"md-close"}
                    size={25}
                    color={"black"} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Light>{text}</Light>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBar: {
        borderBottomWidth: 0.3,
        borderBottomColor: "grey",
        height: 40,
        flexDirection: "row",
        backgroundColor: "white"
    },
    arrow: {
        flex: 4,
        justifyContent: "flex-start",
        marginBottom: 15
    },
    titleContainer: {
        flex: 6,
        justifyContent: "flex-start",
        marginBottom: 15
    },
});
