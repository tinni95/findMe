import React from "react";
import { StyleSheet, View } from "react-native"
import { width } from "../../constants/Layout"

import PostCardPublisher from "./PostCardPublisher"
import PostCardText from "./PostCardText"

export default PostCard = ({ post }) => {
    return (
        <View style={styles.card}>
            <View style={styles.body}>
                <PostCardPublisher />
                <PostCardText />
            </View>
            <View style={styles.footer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 200,
        width,
        borderRadius: 15,
        marginTop: 20,
        backgroundColor: "white"
    },
    body: {
        flex: 8,
        flexDirection: "row"
    },
    footer: {
        flex: 2,
        flexDirection: "row"
    }
});