import React from "react";
import SearchBarComponent from './SearchBarComponent';
import FilterButton from "./FilterButton";
import CurrentFilters from "./CurrentFilters";
import { StyleSheet, View } from "react-native";

export default function SearchHeader() {
    return (
        <View style={styles.container}>
            <SearchBarComponent />
            <View style={styles.footer}>
                <CurrentFilters ambito={"Tutti gli ambiti"} location={"Maddaloni, ce"} />
                <FilterButton />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#02394D",
        flex: 2
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})