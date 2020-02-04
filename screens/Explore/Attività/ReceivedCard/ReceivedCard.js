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

export default function ReceivedCard({ id, application, navigation }) {
    const navigateToProfile = () => navigation.navigate("UserVisitsProfileScreen", { id: application.from.id })
    return (
        <View style={styles.container}>
            <View style={styles.upperContent}>
                <AvatarAndVedi navigateToProfile={navigateToProfile} image={application.from.pictureUrl} />
                <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
                <View style={styles.info}>
                    <Info
                        navigateToProfile={navigateToProfile}
                        navigation={navigation}
                        postId={application.position.post.id}
                        title={application.position.post.title}
                        nome={application.from.nome} cognome={application.from.cognome} comune={application.from.comune} regione={application.from.regione} posizione={application.position.title}></Info>
                </View>
                <View style={styles.tooltip}>
                    <Tooltip backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{application.position.field}</Text>}>
                        <FieldIcon field={application.position.field} size={30} />
                    </Tooltip>
                </View>
            </View>
            <View style={styles.messageWrapper}>
                <Bold style={{ fontSize: 12, marginBottom: 10, color: Colors.blue }}>Risposta</Bold>
                <Light style={{ fontSize: 12, marginBottom: 10 }}>{application.messages[0].text}</Light>
            </View>
            <View style={styles.footer}>
                <View style={styles.buttonWrapper}>
                    <RoundButtonEmptyIcon
                        iconName={"ios-send"}
                        text={"Rispondi"}
                        onPress={() => navigation.navigate("ApplicationReceivedChat", { id, application, isSub: false })}
                        iconColor={Colors.blue}
                        textColor={Colors.blue}
                        color={Colors.blue}
                        isMedium
                    />
                    <RoundButtonEmpty2
                        textColor={Colors.red}
                        color={Colors.red}
                        isLight
                        fontSize={10}
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
        margin: 15,
        marginTop: 5

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