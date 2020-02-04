import React from "react"
import { View, StyleSheet } from "react-native"
import LocationWithText from "../../../../components/shared/LocationWithText"
import { Light, Bold, Body } from "../../../../components/StyledText"
import Colors from "../../../../constants/Colors"
export default function Info({ navigateToProfile, postId, title, nome, cognome, regione, comune, posizione, navigation }) {
    const navigate = navigateToProfile ? navigateToProfile : {}
    return (
        <View style={styles.container}>
            <Bold onPress={navigate} style={{ fontSize: 16 }}>{nome + " " + cognome}</Bold>
            {comune ?
                <LocationWithText points={17} style={{ marginTop: 3 }} comune={comune} regione={regione}></LocationWithText>
                : null
            }
            <Body style={{ fontSize: 14, marginTop: 15, color: Colors.blue }}>Posizione</Body>
            <Light style={{ fontSize: 12, marginTop: 5 }}>{posizione}</Light>
            <Body onPress={() => navigation.navigate('PostScreen', {
                id: postId
            })} style={{ fontSize: 14, marginTop: 15, color: Colors.blue }}>Titolo post</Body>
            <Light
                onPress={() => navigation.navigate('PostScreen', {
                    id: postId
                })} style={{ fontSize: 12, marginTop: 5 }}>{title}</Light>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        margin: 10,
        marginBottom: 0
    }
})