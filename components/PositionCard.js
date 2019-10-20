import React from 'react';
import { Bold } from "./StyledText";
import { View, StyleSheet, Platform } from "react-native";


export default function PositionCard({ position }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Bold style={styles.text}>{position.title}</Bold>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        margin: 5,
        fontSize: 20
    },
    header: {
        flexDirection: "row"
    },
    container: {
        marginTop: 5,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
    }
});