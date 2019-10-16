import React from "react";
import { StyleSheet, Text, View } from "react-native"
import LocationWithText from "../shared/LocationWithText";
import { Bold, Light } from "../StyledText"
import { graphql, createFragmentContainer } from "react-relay";
const descriptionLimit = 180;
const titleLimit = 34;

const fixOverflow = (text, limit) => {
    {
        return ((text).length > limit) ?
            (((text).substring(0, limit - 3)) + '...') :
            text
    }
}
export const PostCardText = ({ post: { description, title } }) => {
    return (
        <View style={styles.container}>
            <Bold>{fixOverflow(title, titleLimit)}</Bold>
            <LocationWithText text={"Caserta, Ce"} color={"#00B6BE"} textColor={"#ADBFC5"} />
            <Light>
                {fixOverflow(description, descriptionLimit)}
            </Light>
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
