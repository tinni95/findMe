import React from "react"
import { createStackNavigator } from 'react-navigation-stack';
import FiltersPage from "../../screens/Explore/FiltersStack";
import { AutoComplete } from "../../screens/shared/AutoComplete"
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Platform } from 'react-native';

export default FiltersModal = createStackNavigator(
    {
        FiltersPage,
        AutoComplete
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

FiltersModal.navigationOptions = ({ navigation }) => {
    return {
        title: "FILTRI",
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
            color: "#10476C",
            fontSize: 12
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={"#10476C"}
                ></Ionicons>
            </TouchableOpacity>
        )
    }
}