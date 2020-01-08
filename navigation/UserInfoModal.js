import React from "react"
import { Platform, TouchableOpacity } from "react-native"
import { createStackNavigator } from 'react-navigation-stack';
import { AutoCompleteLocation } from "../screens/shared/AutoCompleteLocation"
import EditProfile from '../screens/ProfileStack/EditProfile';
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import HeaderStyles from "../screens/shared/HeaderStyles";

const UserInfoModal = createStackNavigator(
    {
        EditProfile,
        AutoCompleteLocation
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

UserInfoModal.navigationOptions = ({ navigation }) => {
    return {
        title: "Profilo",
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle,
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
UserInfoModal.path = '';

export default UserInfoModal 