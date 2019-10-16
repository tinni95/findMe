import React from "react";
import { View, ScrollView } from "react-native";
import PostCard from "../../components/PostCard";
import { StyleSheet } from "react-native";
import SearchHeader from "../../components/SearchHeader";

export default class Explore extends React.Component {

    renderPosts = () => {
        return this.props.posts
            .map((post, index) => {
                return <PostCard key={index} bg={"#00B6BE"} color={"white"} post={post} />
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <SearchHeader />
                <View style={styles.postBody}>
                    <ScrollView>
                        {this.renderPosts()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBEBEB"
    },
    postBody: {
        flex: 5
    }
})

Explore.navigationOptions = {
    header: null,
};
