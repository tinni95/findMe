import React from "react"
import { View, Text } from "react-native"
import { StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import AvatarAndVedi from "../ReceivedCard/AvatarAndVedi"
import FieldIcon from "../../../../components/FieldIcons/FieldIcon"
import { Tooltip } from "react-native-elements"
import { Bold, Body, Light } from "../../../../components/StyledText"
import LocationWithText from "../../../../components/shared/LocationWithText"
import Colors from "../../../../constants/Colors"
import RoundButton from "../../../../components/shared/RoundButton"
import RoundButtonEmptyIcon from "../../../../components/shared/RoundButtonEmptyIcon"
import RoundButtonEmpty2 from "../../../../components/shared/RoundButtonEmpty2"
var shortid = require("shortid")

export default function SentCard({ onPress, application, navigation }) {
    const { post } = application.position
    const navigateToProfile = () => navigation.navigate("UserVisitsProfileScreen", { id: post.postedBy.id })
    return <View style={styles.container}>
        <View style={styles.upperContent}>
            <AvatarAndVedi navigateToProfile={navigateToProfile} image={post.postedBy.pictureUrl} />
            <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
            <View style={styles.info}>
                <Bold style={{ fontSize: 16 }}>{application.position.title}</Bold>
                {post.comune ?
                    <LocationWithText points={17} style={{ marginTop: 3 }} comune={post.comune} regione={post.regione}></LocationWithText>
                    : null
                }
                <Body style={{ fontSize: 14, marginTop: 15, color: Colors.blue }}>Pubblicato da</Body>
                <Light style={{ fontSize: 12, marginTop: 5 }}>{post.hidden ?
                    post.postedBy.nome + post.postedBy.surname[0] + "." : post.postedBy.nome + " " + post.postedBy.cognome}</Light>
                <Body onPress={() => navigation.navigate('PostScreen', {
                    id: post.id
                })} style={{ fontSize: 14, marginTop: 15, color: Colors.blue }}>Titolo post</Body>
                <Light
                    onPress={() => navigation.navigate('PostScreen', {
                        id: post.id
                    })} style={{ fontSize: 12, marginTop: 5 }}>{post.title}</Light>
            </View>
            <View style={styles.tooltip}>
                <Tooltip backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{application.position.field}</Text>}>
                    <FieldIcon field={application.position.field} size={30} />
                </Tooltip>
            </View>
        </View>
        <View style={styles.messageWrapper}>
            <Bold style={{ fontSize: 12, marginBottom: 10, color: Colors.blue }}>Qualifiche</Bold>
            <View style={styles.qualifiche}>
                {application.position.requisiti && application.position.requisiti.length == 0 &&
                    <Body style={styles.pubContent}>Non Specificato</Body>
                }
                {application.position.requisiti && application.position.requisiti.map(qualifica => {
                    return <RoundButton isLight={true} key={shortid.generate()} text={qualifica} textColor={"white"} color={Colors.blue}></RoundButton>
                })}
            </View>
        </View>
        <View style={styles.footer}>
            <View style={styles.buttonWrapper}>
                <RoundButtonEmpty2 buttonStyle={{ padding: 9 }} fontSize={10} onPress={() => navigation.navigate('PostScreen', {
                    id: application.position.post.id
                })} isMedium text={"  Apri  "} textColor={Colors.blue} color={Colors.blue}></RoundButtonEmpty2>
                {application.subRead ?
                    <RoundButtonEmptyIcon
                        onPress={onPress}
                        iconName={"ios-send"}
                        text={"Rispondi"}
                        iconColor={Colors.blue}
                        textColor={Colors.blue}
                        color={Colors.blue}
                        isMedium
                    />
                    :
                    <View style={{ flexDirection: "row" }}>
                        <RoundButtonEmptyIcon
                            onPress={onPress}
                            iconName={"ios-send"}
                            text={"Rispondi"}
                            iconColor={Colors.blue}
                            textColor={Colors.blue}
                            color={Colors.blue}
                            isMedium
                        />
                        <View style={{ marginLeft: -5, width: 15, height: 15, borderRadius: 7.5, backgroundColor: "red", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ textAlign: "center", color: "white", marginTop: 2 }}>*</Text>
                        </View>
                    </View>
                }
            </View>
        </View>
    </View>
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
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%"
    },
    info: {
        flexDirection: "column",
        flex: 6.5,
        margin: 10,
        marginTop: 15,
    },
    tooltip: {
        alignContent: "flex-end",
        margin: 10
    },
    line: {
        flex: 0.03
    },
    qualifiche: {
        marginTop: 5,
        flexWrap: "wrap",
        flexDirection: "row"
    },
})