import React from "react";
import { StyleSheet, View, Platform } from "react-native"
import { width } from "../../constants/Layout"
import { graphql, createFragmentContainer } from "react-relay";
import PostCardPublisher from "./PostCardPublisher"
import PostCardText from "./PostCardText"
import Fields from "./Fields";
import RoundButton from "../shared/RoundButton";
import { LinearGradient } from "expo-linear-gradient";

export const PostCard = ({ post, navigation: { navigate } }) => {
    return (
        <View style={styles.card}>
            <View style={styles.body}>
                <PostCardPublisher post={post} />
                <LinearGradient
                    colors={["#EBEBEB", "#FFFDFD"]}
                    style={styles.line} />
                <PostCardText post={post} />
            </View>
            <View style={styles.footer}>
                <Fields post={post}></Fields>
                <View style={styles.buttonContainer}>
                    <RoundButton text={"Scopri di Più"}
                        onPress={() => navigate("PostScreenQueryRenderer", {
                            id: post.id
                        })} color={"#60E1E0"} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 200,
        width,
        marginTop: 15,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    body: {
        flex: 7,
        flexDirection: "row"
    },
    footer: {
        flex: 3,
        flexDirection: "row"
    },
    buttonContainer: {
        marginLeft: 50,
        marginTop: 10,
        flex: 6
    },
    line: {
        flex: 0.01,
        backgroundColor: "black"
    }
});

export default createFragmentContainer(PostCard, {
    post: graphql`
        fragment PostCard_post on Post {
                id
                ...PostCardText_post
                ...Fields_post
                ...Views_post 
        }
    `,
});
