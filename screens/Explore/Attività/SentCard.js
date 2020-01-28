import React from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import { Body } from "../../../components/StyledText"
import FieldIcon from "../../../components/FieldIcons/FieldIcon"
import RoundButton from "../../../components/shared/RoundButton"
import Colors from "../../../constants/Colors"
import { Tooltip } from "react-native-elements"
import RoundButtonEmpty2 from "../../../components/shared/RoundButtonEmpty2"
import RoundButtonEmptyIcon from "../../../components/shared/RoundButtonEmptyIcon"
var shortid = require("shortid")

export default function SentCard({ application, navigation, id }) {
    return (<View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.imageTextContainer}>
                <Image source={require("../../../assets/images/placeholder.png")} style={styles.image} />
                <Body style={styles.title}>{application.position.title}</Body>
            </View>
            <Tooltip backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{application.position.field}</Text>}>
                <FieldIcon field={application.position.field} size={30} />
            </Tooltip>
        </View>
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flex: 8.6, flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <Body style={styles.pubHeader}>Titolo post</Body>
                    <Body style={styles.pubContent}>{application.position.post.title}</Body>
                </View>
                <View>
                    <Body style={styles.pubHeader}>Pubblicato da</Body>
                    <Body style={styles.pubContent}>{application.position.post.postedBy.nome}</Body>
                </View>
            </View>
            <View style={{ flex: 1.4 }}>
            </View>
        </View>
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <Body style={styles.pubHeader}>Qualifiche</Body>
        <View style={styles.qualifiche}>
            {application.position.requisiti && application.position.requisiti.length == 0 &&
                <Body style={styles.pubContent}>Non Specificato</Body>
            }
            {application.position.requisiti && application.position.requisiti.map(qualifica => {
                return <RoundButton style={{ marginTop: 7.5, marginRight: 5 }} isLight={true} key={shortid.generate()} text={qualifica} textColor={"white"} color={Colors.blue}></RoundButton>
            })}
        </View>
        <View style={styles.line} />
        <View style={styles.footer}>
            <View style={styles.visualizzaWrapper}>
                <RoundButtonEmpty2 onPress={() => navigation.navigate('PostScreen', {
                    id: application.position.post.id
                })} isMedium text={"  Apri  "} textColor={Colors.blue} color={Colors.blue}></RoundButtonEmpty2>
                <RoundButtonEmptyIcon
                    onPress={() => navigation.navigate("ApplicationSentChat", { id, application, isSub: true })}
                    iconName={"ios-send"}
                    text={"Rispondi"}
                    iconColor={Colors.blue}
                    textColor={Colors.blue}
                    color={Colors.blue}
                    isMedium
                />
            </View>
        </View>
    </View>)
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pubHeader: {
        color: Colors.blue,
        fontSize: 13
    },
    pubContent: {
        color: "#5F5E5E",
        fontSize: 12,
        marginTop: 5
    },
    qualifiche: {
        flexWrap: "wrap",
        flexDirection: "row"
    },
    container: {
        backgroundColor: "white",
        width: "100%",
        padding: 15,
        marginBottom: 5
    },
    title: {
        color: "black",
        fontSize: 20,
        marginTop: 5,
        marginLeft: 5
    },
    spacer: { height: 10 },
    footer: {
        borderTopWidth: 0.3,
        marginLeft: 10,
        marginRight: 10,
        borderTopColor: "#D0D0D0",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,

    },
    visualizzaWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%"
    },
    line: {
        borderBottomWidth: 0.3,
        borderBottomColor: "#D0D0D0",
        height: 40,
    },
    imageTextContainer: {
        flexDirection: "row"
    },
    image: {
        width: 40, height: 40, borderRadius: 20,
        marginLeft: 0,
        marginRight: 5
    }
})