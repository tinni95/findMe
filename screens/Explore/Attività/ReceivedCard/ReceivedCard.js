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
import { Bold, Light } from "../../../../components/StyledText"

export default function ReceivedCard({ posizione }) {
    return (
        <View style={styles.container}>
            <View style={styles.upperContent}>
                <AvatarAndVedi />
                <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
                <View style={styles.info}>
                    <Info nome={posizione.user.nome} cognome={posizione.user.cognome} comune={posizione.user.comune} regione={posizione.user.regione} posizione={posizione.position.title}></Info>
                </View>
                <View style={styles.tooltip}>
                    <Tooltip backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{posizione.position.field}</Text>}>
                        <FieldIcon field={posizione.position.field} size={30} />
                    </Tooltip>
                </View>
            </View>
            <View style={styles.messageWrapper}>
                <Bold style={{ fontSize: 12, marginBottom: 10 }}>Risposta</Bold>
                <Light style={{ fontSize: 12, marginBottom: 10 }}>{posizione.messages[0].text}</Light>
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
                        isMedium
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
    messageWrapper: {
        justifyContent: "flex-start",
        margin: 15

    },
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
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%"
    },
    info: {
        flexDirection: "row",
        flex: 6.5,
        marginBottom: 10
    },
    tooltip: {
        alignContent: "flex-end",
        margin: 10
    },
    line: {
        flex: 0.03
    }
})