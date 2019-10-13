import React from "react";
import { View, Text } from "react-native";
import FieldIconRound from "../../components/FieldIcons/FieldIconRound";

export default class Explore extends React.Component {

    renderPosts = () => {
        return this.props.posts
            .map((post, index) => {
                return <FieldIconRound key={index} bg={"#00B6BE"} color={"white"} field={post.positions[0].field} />
            });
    };

    render() {
        return this.renderPosts()
    }
}

Explore.navigationOptions = {
    header: null,
};
