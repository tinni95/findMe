import React from "react"
import { createStackNavigator } from 'react-navigation-stack';
import FiltersPage from "../../screens/Explore/FiltersStack";
import { AutoCompleteFiltri } from "../../screens/shared/AutoCompleteFiltri"
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Platform } from 'react-native';
import HeaderStyles from "../../screens/shared/HeaderStyles";

export default FiltersModal = createStackNavigator(
    {
        FiltersPage,
        AutoComplete: AutoCompleteFiltri
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

FiltersModal.navigationOptions = ({ navigation }) => {
    return {
        title: "Filtri",
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle,
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