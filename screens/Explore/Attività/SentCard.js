import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Body } from "../../../components/StyledText"
import FieldIcon from "../../../components/FieldIcons/FieldIcon"
import RoundButton from "../../../components/shared/RoundButtonEmpty"
import { Colors } from "../../../constants/Colors"
import { Tooltip } from "react-native-elements"


export default function SentCard({ field, title, qualifiche, pubblicatoDa }) {
    return (<View style={styles.container}>
        <View style={styles.header}>
            <Body style={styles.title}>{title}</Body>
            <Tooltip backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{field}</Text>}>
                <FieldIcon field={field} size={30} />
            </Tooltip>
        </View>
        <View style={styles.spacer} />
        <Body style={styles.pubHeader}>Pubblicato Da:</Body>
        <Body style={styles.pubContent}>{pubblicatoDa}</Body>
        <Body style={styles.pubHeader}>Qualifiche</Body>
        <View style={styles.qualifiche}>
            {qualifiche && qualifiche.map(qualifica => {
                <RoundButton text={qualifica} textColor={"white"} color={Colors.blue}></RoundButton>
            })}
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
        fontSize: 15
    },
    pubContent: {
        color: "#5F5E5E",
        fontSize: 14
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
    spacer: { height: 10 }
})