import React from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { Body, Light } from "../../components/StyledText"
import RoundButtonEmpty2 from "../../components/shared/RoundButtonEmpty2"
import Colors from "../../constants/Colors"
import ConnessioneHeader from "./ConnessioneHeader"

export default function ConnessioneRequestCard({ image, notifica, navigation }) {
    return <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("UserVisitsProfile", { id: notifica.from.id })} style={styles.imageContainer}>
            <Image source={image} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
            <ConnessioneHeader createdAt={notifica.createdAt} />
            <Body style={styles.title}>{notifica.text}</Body>
            <View style={styles.center}>
                <RoundButtonEmpty2
                    isMedium
                    fontSize={9}
                    buttonStyle={{ padding: 5 }}
                    color={Colors.blue}
                    textColor={Colors.blue}
                    text={"  Accetta  "}
                />
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        alignSelf: "baseline",
        minHeight: 80,
        flexDirection: "row",
        borderBottomWidth: 0.3,
        borderBottomColor: "#C6BEBE"
    },
    imageContainer: {
        margin: 10,
        flex: 1
    },
    contentContainer: {
        flex: 8,
        margin: 10
    },
    title: {
        fontSize: 12,
        marginBottom: 10
    },
    text: {
        fontSize: 12
    }
})