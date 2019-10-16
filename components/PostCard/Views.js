import React from "react";
import { StyleSheet, View } from "react-native"
import { graphql, createFragmentContainer } from "react-relay";
import { Body } from "../StyledText"

export const Views = ({ post: views }) => {
    return (
        <View style={styles.container}>
            <Body style={styles.text}>visualizzazioni</Body>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        margin: 8
    },
    text: {
        fontSize: 10
    }
});


export default createFragmentContainer(Views, {
    post: graphql`
        fragment Views_post on Post {
            views
        }
    `,
});
