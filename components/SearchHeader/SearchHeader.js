import React from "react";
import SearchBarComponent from './SearchBarComponent';
import FilterButton from "./FilterButton";
import { StyleSheet, View } from "react-native";
import { isSmallDevice } from "../../constants/Layout"
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";


export default function SearchHeader({ setSearch, search }) {
    return (
        <LinearGradient
            colors={["#053144", "#26547C"]}
            style={styles.container}>
            <SearchBarComponent search={search} setSearch={setSearch} />
            <View style={styles.footer}>
                <FilterButton />
            </View>
        </LinearGradient>
    );
}

SearchHeader.propTypes = {
    setSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#02394D",
        flex: isSmallDevice ? 1.9 : 1.4
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})