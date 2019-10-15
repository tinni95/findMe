import React from "react";
import { Button } from 'react-native-paper';
import { StyleSheet } from "react-native";

export default function FilterButton() {
    return (
        <Button style={styles.button} color="#707070" mode="contained" onPress={() => console.log('Pressed')}>
            FILTRI
        </Button>
    );
}
const styles = StyleSheet.create({
    button: {
        width: 80,
        margin: 10,
        alignSelf: "flex-end"
    }
})