import React from "react"
import { Image, StyleSheet, View } from "react-native"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeGraphQlErrorDisplay"
import FindMeSpinner from "../../shared/FindMeSpinner"
import { gql } from "apollo-boost"
import { useQuery } from "react-apollo"
import { Body } from "../../components/StyledText"

const User = gql`
{
    currentUser{
        nome
        cognome
    }
}
`

export default function AvatarAndName() {
    const { loading, error, data } = useQuery(User, { fetchPolicy: "no-cache" });
    if (error) {
        return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
    }
    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }
    return (
        <View style={styles.row}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/placeholder.png")} style={{ width: 30, height: 30, borderRadius: 15 }} />
            </View>
            <Body style={styles.name}>{data.currentUser.nome + " " + data.currentUser.cognome}</Body>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    name: {
        fontSize: 12,
        color: "#707070",
        marginLeft: 15
    }
})