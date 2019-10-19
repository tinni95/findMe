import React from "react";
import { StyleSheet, View } from "react-native"
import LocationWithText from "../shared/LocationWithText";
import { Bold, Body } from "../StyledText"
import { graphql, createFragmentContainer } from "react-relay";
import { isSmallDevice } from "../../constants/Layout"
import moment from "moment";
const titleLimit = 50;

const fixOverflow = (text, limit) => {
    {
        return ((text).length > limit) ?
            (((text).substring(0, limit - 3)) + '...') :
            text
    }
}
const MainText = ({ date, field }) => {
    return (
        <View style={styles.mainTextContainer}>
            <View style={styles.mainTextColumn}>
                <Bold style={styles.columnHeader}>Data Inizio</Bold>
                <Bold style={styles.columnBody}>{moment(date).format("YYYY/MM/DD")}</Bold>
            </View>
            <View style={styles.mainTextColumn}>
                <Bold style={styles.columnHeader}>Settore</Bold>
                <Bold style={styles.columnBody}>{field}</Bold>
            </View>
        </View>
    )
}
export const PostCardText = ({ post: { title, date, field, location } }) => {
    return (
        <View style={styles.container}>
            <Bold style={styles.title}>{fixOverflow(title, titleLimit)}</Bold>
            <LocationWithText style={styles.location} location={location} color={"#DD1E63"} textColor={"#ADBFC5"} />
            {MainText({ date, field })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 4,
        margin: 5
    },
    title: {
        fontSize: isSmallDevice ? 16 : 18
    },
    mainTextContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    mainTextColumn: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    columnHeader: {
        fontSize: 11,
        color: "#ADADAD"
    },
    columnBody: {
        fontSize: 13,
        marginTop: isSmallDevice ? 5 : 8,
        color: "#002C3C"
    },
    content: {
        flex: 9
    },
});

export default createFragmentContainer(PostCardText, {
    post: graphql`
        fragment PostCardText_post on Post {
                title
                startDate
                field
                location
        }
    `,
});
