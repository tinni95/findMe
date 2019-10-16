import React from "react";
import { Text, StyleSheet, Image, View } from "react-native"
import People from "../../assets/images/people.svg";
import { graphql, createFragmentContainer } from "react-relay";
import { Bold, Light } from "../StyledText"

const availablePositions = (positions) => {
    const amount = positions.reduce(
        (acc, position) => acc + position.available,
        0
    );
    return (
        <Bold style={styles.amount}>{amount} POSITIONS AVAILABLE</Bold>
    )
}

const authorInfo = () => {
    return (
        <View style={styles.authorInfo}>
            <People
                style={{ marginTop: -5, marginLeft: 2 }}
                width={20} height={20}
                fill={"#3B3B3B"}
            />
            <Text style={styles.authorInfoText}>
                Membri (2)
            </Text>
        </View>
    )
}

export const PostCardPublisher = ({ post: { positions } }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image resizeMode="contain" style={styles.image}
                    source={require("../../assets/images/placeholder.jpeg")} />
            </View>
            <View style={styles.infoContainer}>
                {authorInfo()}
            </View>
            <View style={styles.positionsContainer}>
                {availablePositions(positions)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1.5,
        borderRightColor: "black",
        borderRightWidth: 1,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    imageContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        top: -10,
        justifyContent: "flex-end",
    },
    authorInfo: {
        marginLeft: 4,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    authorInfoText: {
        fontSize: 12,
        color: "#00B6BE",
        fontFamily: "Avenir",
        fontWeight: "bold",
        marginTop: -2,
        marginLeft: 2
    },
    amount: {
        textAlign: "center",
        fontSize: 6.5,
        margin: 5
    },


});

export default createFragmentContainer(PostCardPublisher, {
    post: graphql`
        fragment PostCardPublisher_post on Post {
            positions {
                available
            }
        }
    `,
});