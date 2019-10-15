import React from "react";
import LocationWithText from "../shared/LocationWithText";
import { Text, StyleSheet, View } from "react-native";

export default function CurrentFilters({ ambito, location }) {
    return (
        <View style={styles.container}>
            <Text style={styles.ambito}>{ambito}</Text>
            <View style={styles.locationContainer}>
                <LocationWithText text={location} color={"#00B6BE"} textColor={"#ADBFC5"} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-between",
        margin: 10
    },
    ambito: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold"
    }
})