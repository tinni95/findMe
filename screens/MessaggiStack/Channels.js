import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import TabBars from "../../shared/TabBars";
import { SceneMap } from "react-native-tab-view";
import Colors from "../../constants/Colors";

export default function Channels() {
    const FirstRoute = () => (
        <View style={styles.scene} />
    );

    const SecondRoute = () => (
        <View style={styles.scene} />
    );

    const [routes] = React.useState([
        { key: 'first', title: 'Chat' },
        { key: 'second', title: 'Post Idea' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        <TabBars renderScene={renderScene} routes={routes}></TabBars>
    );

}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

Channels.navigationOptions = ({ navigation }) => {
    return {
        title: "Messaggi",
        headerStyle: {
            ...Platform.select({
                ios: {
                    shadowColor: "black",
                    shadowOffset: { height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3
                },
                android: {
                    elevation: 20
                },
            })
        },
        headerTitleStyle: {
            fontFamily: "sequel-sans-bold",
            color: Colors.blue,
            fontSize: 12
        },
    }
}