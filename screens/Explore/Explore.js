import React from "react";
import { View, Text } from "react-native";
import ItemCard from "../../shared/components/ItemCard"
export default class Explore extends React.Component {

    renderCards = () => {
        return this.props.itemCards
            .map((Card, index) => {
                return (
                    <ItemCard
                        id={index}
                        key={Card.id}
                        Card={Card}
                        navigation={this.props.navigation}
                    />
                );
            });
    };

    render() {
        return <ItemCard></ItemCard>
    }
}

Explore.navigationOptions = {
    header: null,
};
