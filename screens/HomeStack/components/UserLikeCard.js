import React from "react"
import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Body, Light } from "../../../components/StyledText"

export default function UserLikeCard({ user, navigation }) {
    const image = user.pictureUrl ? { uri: user.pictureUrl } : require("../../../assets/images/placeholder.png")
    return <TouchableOpacity onPress={() => navigation.navigate("UserVisitsProfileScreen", { id: user.id })} style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.subContainer}>
            <Light style={styles.text}>{user.nome + " " + user.cognome}</Light>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2.5,
        flexDirection: "row",
        alignContent: "center",
    },
    subContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        borderBottomColor: "grey",
        borderBottomWidth: 0.3,
        marginRight: 10,
    },
    text: {
        fontSize: 13,
    },
    image: {
        alignContent: "center",
        margin: 10, width: 30, height: 30, borderRadius: 15
    }
})