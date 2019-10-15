import React from "react";
import SearchBarComponent from './SearchBarComponent';
import { StyleSheet, View } from "react-native";

export default function SearchHeader() {
    return (
        <View style={styles.container}>
            <SearchBarComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#02394D",
        flex: 2
    }
})