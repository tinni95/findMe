import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Tooltip } from "react-native-elements"
import FieldIcon from "../../../../components/FieldIcons/FieldIcon"
import RoundButtonEmptyIcon from "../../../../components/shared/RoundButtonEmptyIcon"
import Colors from "../../../../constants/Colors"
import RoundButtonEmpty2 from "../../../../components/shared/RoundButtonEmpty2"
import AvatarAndVedi from "./AvatarAndVedi"
import Info from "./Info"
var shortid = require("shortid")

export default function ReceivedCard({ posizione }) {
    return (
        <View style={styles.container}>
            <View style={styles.upperContent}>
                <AvatarAndVedi />
                <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
                <View style={styles.info}>
                    <Info nome={posizione.user.nome} cognome={posizione.user.cognome} provincia={posizione.user.provincia} regione={posizione.user.regione} posizione={posizione.position.title}></Info>
                </View>
                <View style={styles.tooltip}>
                    <Tooltip backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{posizione.position.field}</Text>}>
                        <FieldIcon field={posizione.position.field} size={30} />
                    </Tooltip>
                </View>
            </View>
            <View style={styles.messageWrapper}>

            </View>
            <View style={styles.footer}>
                <View style={styles.buttonWrapper}>
                    <RoundButtonEmptyIcon
                        iconName={"ios-send"}
                        text={"Rispondi"}
                        iconColor={Colors.blue}
                        textColor={Colors.blue}
                        color={Colors.blue}
                        isMedium
                    />
                    <RoundButtonEmpty2
                        textColor={Colors.red}
                        color={Colors.red}
                        text={"Accetta"}
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        marginBottom: 5
    },
    upperContent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    footer: {
        justifyContent: "center",
        alignItems: "center"
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    info: {
        flexDirection: "row",
        flex: 6.5
    },
    tooltip: {
        alignContent: "flex-end",
        margin: 10
    },
    line: {
        flex: 0.03
    }
})