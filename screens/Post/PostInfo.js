import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Bold, Body } from '../../components/StyledText';

export default function PostInfo({ fields, user, isHidden }) {

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Text style={{ lineHeight: 20, }}>
                    <Body>Categoria:</Body>
                    <Body style={styles.grigio}> {fields.replace(/,/g, ", ")}</Body>
                </Text>
            </View>
            <View style={styles.line}>
                {user &&
                    <View style={{ flexDirection: "row" }}>
                        <Body>Pubblicato Da:</Body>
                        {!isHidden ?
                            <Body style={styles.grigio}>
                                {" " + user.nome} {user.cognome}</Body> :
                            <Body style={styles.grigio}>
                                {" " + user.nome + " " + user.cognome[0] + "."}</Body>}
                    </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        margin: 10,
        marginLeft: 15,
        marginTop: 20
    },
    line: {
        flexDirection: "row",
        margin: 5,
        marginTop: 10,
        marginLeft: 0,
    },
    grigio: {
        color: "#989898",

    }
})