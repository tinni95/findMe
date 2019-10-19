import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Filters from "../../assets/images/controls.svg";

export default function FilterButton() {
    return (
        <TouchableOpacity>
            <Filters
                style={styles.button}
                width={25} height={25}
                fill={"white"}
            />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        margin: 10,
    }
})