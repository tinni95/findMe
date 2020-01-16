import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import RoundButtonEmpty2 from "../components/shared/RoundButtonEmpty2";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Body, Bold, Light } from "../components/StyledText";
import LocationWithText from "../components/shared/LocationWithText";

const fixOverflow = (text, limit) => {
    {
        return text.length > limit ? `${text.substring(0, limit - 3)}...` : text;
    }
};

export default function ConnessioneCard({ user, id, navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("UserVisitsProfileScreen", { userId: id, id: user.id })} style={styles.container}>
            <View style={styles.left}>
                <Image source={require("../assets/images/placeholder.png")} style={{ width: 60, height: 60, borderRadius: 30, margin: 20, marginTop: 5 }} />
                <RoundButtonEmpty2
                    buttonStyle={{ marginBottom: 20 }}
                    color={Colors.ocean}
                    textColor={Colors.ocean}
                    text={"Profilo"}
                    isMedium />
            </View>
            <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
            <View style={styles.right}>
                <Bold style={styles.nome}>{user.nome + " " + user.cognome}</Bold>
                <Body style={styles.posizione}>Full stack developer</Body>
                {user.comune && <LocationWithText fontSize={10} points={16} comune={user.comune} regione={user.regione} />}
                {user.presentazione && <Light style={styles.presentazione}>{fixOverflow(user.presentazione, 150)}</Light>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "baseline",
        backgroundColor: "white",
        flexDirection: "row",
        marginTop: 5
    },
    line: {
        flex: 0.1
    },
    left: {
        flex: 2,
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center"
    },
    right: {
        flex: 6,
        flexDirection: "column",
        margin: 10
    },
    nome: {
        fontSize: 16,
        marginBottom: 5
    },
    posizione: {
        fontSize: 10,
        marginBottom: 5,
        color: "#AFA9A9"
    },
    presentazione: {
        fontSize: 11,
    }
})