import React from 'react';
import { Bold, Body, Light } from "./StyledText";
import { View, StyleSheet, Platform } from "react-native";
import FieldIconRound from "./FieldIcons"

export default function PositionCard({ position }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Bold style={styles.headerText}>{position.title}</Bold>
                <View style={styles.iconContainer}>
                    <FieldIconRound size={25} field={position.field} color={"#60E1E0"} />
                </View>
            </View>
            <View style={styles.columns}>
                <View style={styles.column}>
                    <Bold style={styles.columnHeader}>Data Inizio</Bold>
                    <Bold style={styles.columnText}>24/10/1995</Bold>
                </View>
                <View style={styles.column}>
                    <Bold style={styles.columnHeader}>Posizioni Disponibili</Bold>
                    <Bold style={styles.columnText}>{position.available}</Bold>
                </View>
            </View>
            <View style={styles.description}>
                <View style={styles.descriptionHeader}>
                    <Bold style={styles.headerTextDescription}>Descrizione Lavoro</Bold>
                </View>
                <View style={styles.DescriptionItem}>
                    <Body style={styles.DescriptionItemTitle}> Ruoli Principali</Body>
                    <Light style={styles.DescriptionItemBody}></Light>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    DescriptionItemTitle: {
        marginTop: 5,
        fontSize: 18
    },
    descriptionHeader: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#D0D0D0"
    },
    description: {
        marginRight: 10,
        marginLeft: 10
    },
    headerText: {
        margin: 10,
        marginTop: 7.5,
        marginBottom: 5,
        fontSize: 25,
    },
    headerTextDescription: {
        ...this.headerText,
        fontSize: 22
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconContainer: {
        marginRight: 5
    },
    container: {
        marginTop: 10,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -10 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    columns: {
        margin: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    column: {
        flexDirection: "column",
        alignItems: "flex-start"
    },
    columnHeader: {
        fontSize: 10,
        color: "#ADADAD"
    },
    columnText: {
        fontSize: 12,
        color: "#002C3C"
    }
});