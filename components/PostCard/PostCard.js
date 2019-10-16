import React from "react";
import { StyleSheet, View } from "react-native"
import { width } from "../../constants/Layout"
import { graphql, createFragmentContainer } from "react-relay";
import PostCardPublisher from "./PostCardPublisher"
import PostCardText from "./PostCardText"
import Fields from "./Fields";
import Views from "./Views";
import CreatedAt from "./CreatedAt";
export const PostCard = ({ post }) => {
    return (
        <View style={styles.card}>
            <View style={styles.body}>
                <PostCardPublisher />
                <PostCardText post={post} />
            </View>
            <View style={styles.footer}>
                <Fields post={post}></Fields>
                <Views post={post}></Views>
                <CreatedAt ></CreatedAt>
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

export default createFragmentContainer(PostCard, {
    post: graphql`
        fragment PostCard_post on Post {
                ...PostCardText_post
                ...Fields_post
                ...Views_post 
        }
    `,
});
