import React from "react";
import { View, ScrollView } from "react-native";
import PostCard from "../../components/PostCard";
import { StyleSheet } from "react-native";
import SearchHeader from "../../components/SearchHeader";
import { graphql, createFragmentContainer } from "react-relay";

export class Explore extends React.Component {

    state = {
        search: ""
    }

    updateSearch = search => {
        this.setState({ search });
    };

    renderPosts = () => {
        return this.props.posts
            .map((post, index) => {
                return <PostCard key={index} bg={"#00B6BE"} color={"white"} post={post} />
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <SearchHeader search={this.state.search} setSearch={this.updateSearch} />
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
        backgroundColor: "white"
    },
    postBody: {
        flex: 5
    }
})

Explore.navigationOptions = {
    header: null,
};

export default createFragmentContainer(Explore, {
    post: graphql`
        fragment Explore_post on Post {
            title
            description
        }
    `,
});
