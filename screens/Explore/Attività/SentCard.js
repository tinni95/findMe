import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Body } from "../../../components/StyledText"
import FieldIcon from "../../../components/FieldIcons/FieldIcon"
import RoundButton from "../../../components/shared/RoundButton"
import Colors from "../../../constants/Colors"
import { Tooltip } from "react-native-elements"
import RoundButtonEmpty2 from "../../../components/shared/RoundButtonEmpty2"
var shortid = require("shortid")

export default function SentCard({ navigation, field, title, qualifiche, pubblicatoDa, id }) {
    return (<View style={styles.container}>
        <View style={styles.header}>
            <Body style={styles.title}>{title}</Body>
            <Tooltip backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{field}</Text>}>
                <FieldIcon field={field} size={30} />
            </Tooltip>
        </View>
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <Body style={styles.pubHeader}>Pubblicato Da:</Body>
        <Body style={styles.pubContent}>{pubblicatoDa}</Body>
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <Body style={styles.pubHeader}>Qualifiche</Body>
        <View style={styles.qualifiche}>
            {qualifiche && qualifiche.length == 0 &&
                <Body style={styles.pubContent}>Non Specificato</Body>
            }
            {qualifiche && qualifiche.map(qualifica => {
                return <RoundButton style={{ marginTop: 7.5, marginRight: 5 }} isLight={true} key={shortid.generate()} text={qualifica} textColor={"white"} color={Colors.blue}></RoundButton>
            })}
        </View>
        <View style={styles.line} />
        <View style={styles.visualizzaWrapper}>
            <RoundButtonEmpty2 onPress={() => navigation.navigate('PostScreen', {
                id
            })} isLight text={"Visualizza"} textColor={Colors.blue} color={Colors.blue}></RoundButtonEmpty2>
        </View>
    </View>)
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pubHeader: {
        color: "#191919",
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
        fontSize: 20
    },
    spacer: { height: 10 },
    visualizzaWrapper: {
        justifyContent: "center",
        alignItems: "center",
        margin: 15,
    },
    line: {
        borderBottomWidth: 0.3,
        borderBottomColor: "#D0D0D0",
        height: 20,
    }
})