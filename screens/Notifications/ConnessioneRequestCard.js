import React from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { Body, Light } from "../../components/StyledText"
import RoundButtonEmpty2 from "../../components/shared/RoundButtonEmpty2"
import Colors from "../../constants/Colors"
import ConnessioneHeader from "./ConnessioneHeader"
import { gql } from "apollo-boost"
import { useMutation } from "react-apollo"

const OPENNOTIFICA_MUTATION = gql`
mutation openNotificaMutation($notificaId:ID!){
    openNotifica(notificaId:$notificaId){
        id
    }
}`

export default function ConnessioneRequestCard({ refetch, image, notifica, navigation }) {
    const [openNotifica] = useMutation(OPENNOTIFICA_MUTATION, {
        onCompleted: () => { refetch() }
    });
    return <TouchableOpacity onPress={() => {
        navigation.navigate("UserVisitsProfileScreen", { id: notifica.from.id })
        openNotifica({ variables: { notificaId: notifica.id } })
    }} style={[styles.container, { backgroundColor: notifica.opened ? "white" : null }]}>
        <View style={styles.imageContainer}>
            <Image source={image} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
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
    </TouchableOpacity>
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