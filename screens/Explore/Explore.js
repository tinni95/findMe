import React from "react";
import { View, Text } from "react-native";
import FieldIconRound from "../../components/FieldIcons/FieldIconRound";
import { StyleSheet } from "react-native";
import SearchHeader from "../../components/SearchHeader";

export default class Explore extends React.Component {

    renderPosts = () => {
        return this.props.posts
            .map((post, index) => {
                return <FieldIconRound key={index} bg={"#00B6BE"} color={"white"} field={post.positions[0].field} />
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <SearchHeader />
                <View style={styles.postBody}>
                    {this.renderPosts()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    postBody: {
        flex: 5
    }
})

Explore.navigationOptions = {
    header: null,
};
