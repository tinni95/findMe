import React from "react";
import { StyleSheet, View } from "react-native"
import { graphql, createFragmentContainer } from "react-relay";
import { Body } from "../StyledText"
import { Icon } from "react-native-elements";

export const Views = ({ post: { views } }) => {
    return (
        <View style={styles.container}>
            <Icon
                size={20}
                color={"#959595"}
                name="ios-eye"
                type="ionicon"
            />
            <Body style={styles.text}>{views} visualizzazioni</Body>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: "row",
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 10,
        marginLeft: 5
    }
});


export default createFragmentContainer(Views, {
    post: graphql`
        fragment Views_post on Post {
            views
        }
    `,
});
