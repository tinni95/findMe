import React from "react"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform, RefreshControl } from 'react-native';
import Colors from "../constants/Colors";

export default function TabBars({ routes, renderScene }) {
    const [index, setIndex] = React.useState(0);
    const initialLayout = { width: Dimensions.get('window').width };

    renderTabBar = props => {
        return (<TabBar
            style={{ paddingTop: 5, backgroundColor: '#FFFFFF', elevation: 0, borderColor: '#B9B0B0', borderBottomWidth: 1, height: 60 }}
            getLabelText={({ route }) => route.title}
            labelStyle={{ fontSize: 14, fontFamily: 'sequel-sans-bold' }}
            {...props}
            activeColor={"black"}
            inactiveColor={"#9F9292"}
            indicatorStyle={{ backgroundColor: Colors.ocean, height: 2.5, marginBottom: -2 }}
        />
        );
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            inactiveColor={"grey"}
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
