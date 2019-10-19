import React from "react";
import SearchBarComponent from './SearchBarComponent';
import FilterButton from "./FilterButton";
import CurrentFilters from "./CurrentFilters";
import { StyleSheet, View } from "react-native";
import { isSmallDevice } from "../../constants/Layout"
import PropTypes from "prop-types";

export default function SearchHeader({ setSearch, search }) {
    return (
        <View style={styles.container}>
            <SearchBarComponent search={search} setSearch={setSearch} />
            <View style={styles.footer}>
                <CurrentFilters ambito={"Tutti gli ambiti"} location={"Maddaloni, ce"} />
                <FilterButton />
            </View>
        </View>
    );
}

SearchHeader.propTypes = {
    setSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#02394D",
        flex: isSmallDevice ? 2.5 : 1.8
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})