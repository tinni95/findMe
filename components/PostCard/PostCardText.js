import React from "react";
import { StyleSheet, Text, View } from "react-native"
import LocationWithText from "../shared/LocationWithText";
import { Bold, Light } from "../StyledText"
import { graphql, createFragmentContainer } from "react-relay";

export const PostCardText = ({ post }) => {
    return (
        <View style={styles.container}>
            <Bold>{post.title}</Bold>
            <LocationWithText text={"Caserta, Ce"} color={"#00B6BE"} textColor={"#ADBFC5"} />
            <Light>{post.description}</Light>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 4,
        margin: 5
    },
});

export default createFragmentContainer(PostCardText, {
    post: graphql`
        fragment PostCardText_post on Post {
                title
                description
        }
    `,
});
