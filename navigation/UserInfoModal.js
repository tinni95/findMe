import React from "react"
import { Platform, TouchableOpacity } from "react-native"
import { createStackNavigator } from 'react-navigation-stack';
import { AutoCompleteLocation } from "../screens/shared/AutoCompleteLocation"
import EditProfile from '../screens/ProfileStack/EditProfile';
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

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
        title: "PROFILO",
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
UserInfoModal.path = '';

export default UserInfoModal 