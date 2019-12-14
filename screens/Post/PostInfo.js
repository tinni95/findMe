import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Bold, Body } from '../../components/StyledText';

export default function PostInfo({ fields, tipoSocio, posizione, user, isHidden, pubblicatoDa }) {

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Body>Categoria:</Body>
                <Body style={styles.grigio}> {fields}</Body>
            </View>
            <View style={styles.line}>
                {user ?
                    <View style={{ flexDirection: "row" }}>
                        <Body>Pubblicato Da:</Body>
                        {!isHidden ?
                            <Body style={styles.grigio}>
                                {" " + user.nome} {user.cognome}</Body> :
                            <Body style={styles.grigio}>
                                {" " + user.nome[0] + "."}   {user.cognome}</Body>}
                    </View>
                    : <View style={{ flexDirection: "row" }}>
                        <Body>Pubblicato Da: </Body>
                        <Body style={styles.grigio}>{pubblicatoDa}</Body>
                    </View>}
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
        marginTop: 10,
        marginLeft: 0
    },
    grigio: { color: "#989898" }
})