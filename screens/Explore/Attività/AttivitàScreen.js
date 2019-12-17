import React from "react"
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors"
const FirstRoute = () => (
    <View style={styles.scene} />
);

const SecondRoute = () => (
    <View style={styles.scene} />
);

const initialLayout = { width: Dimensions.get('window').width };

export default function AttivitàScreen() {
    renderTabBar = props => {
        return (<TabBar
            style={{ backgroundColor: '#FFFFFF', elevation: 0, borderColor: '#B9B0B0', borderBottomWidth: 1, height: 50 }}
            labelStyle={{ color: 'black', fontSize: 14, fontFamily: 'sequel-sans-bold', }}
            {...props}
            indicatorStyle={{ backgroundColor: Colors.ocean, height: 2.5 }}
        />
        );
    }

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Inviate' },
        { key: 'second', title: 'Ricevute' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            indicatorStyle={{ backgroundColor: Colors.blue, height: 2 }}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

AttivitàScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "ATTIVITA'",
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
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}