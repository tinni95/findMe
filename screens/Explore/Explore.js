import React from "react";
import { View, Text } from "react-native";

export default class Explore extends React.Component {

    renderCards = () => {
        return this.props.posts
            .map((post, index) => {
                return <Text key={index}>{post.title}</Text>
            });
    };

    render() {
        return this.renderCards()
    }
}

Explore.navigationOptions = {
    header: null,
};
