import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Body } from "../../../../components/StyledText"
import Colors from "../../../../constants/Colors"

export default function AvatarAndVedi() {
    return <View style={styles.imageTextContainer}>
        <Image source={require("../../../../assets/images/placeholder.png")} style={styles.image} />
        <Body style={styles.title}>Vedi Profilo</Body>
    </View>
}

const styles = StyleSheet.create({
    imageTextContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 2,
        marginTop: 10
    },
    image: {
        width: 50, height: 50, borderRadius: 25,
        marginLeft: 0,
        marginRight: 5
    },
    title: {
        marginTop: 10,
        fontSize: 12,
        color: Colors.blue
    }
})