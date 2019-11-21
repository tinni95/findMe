import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Bold, Body } from '../../components/StyledText';

export default function PostInfo({ fields, tipoSocio, posizione, pubblicatoDa }) {
    const stringify = (fields) => {
        return fields.map((field, index) => {
            if (index !== fields.length - 1) {
                return field + ", "
            }
            else return field
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Body>Categoria:</Body>
                <Body style={styles.grigio}> {stringify(fields)}</Body>
            </View>
            <View style={styles.line}>
                <Body>Pubblicato Da:</Body>
                <Body style={styles.grigio}> {pubblicatoDa}</Body>
            </View>
            <View style={styles.line}>
                <Body>Si Propone Come:</Body>
                <Body style={styles.grigio}> {tipoSocio}</Body>
            </View>
            <View style={styles.line}>
                <Body>Posizione:</Body>
                <Body style={styles.grigio}> {posizione}</Body>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        margin: 10,
        marginTop: 20
    },
    line: {
        flexDirection: "row",
        margin: 5,
        marginLeft: 0
    },
    grigio: { color: "#989898" }
})