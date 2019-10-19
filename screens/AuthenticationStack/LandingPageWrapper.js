import React from "react";
import FindMeSpinner from "../../shared/relay/FindMeSpinner";
import { AsyncStorage } from "react-native";
const TOKEN_KEY = "apsofjkcaoisll032ir";

const _asyncStorageGetToken = async () => {
    await AsyncStorage.getItem(TOKEN_KEY);
};

export default class LandingPageWrapper extends React.Component {

    async componentDidMount() {
        const token = await _asyncStorageGetToken();
        console.log("token", token)
        if (token) this.props.navigation.navigate("MainTabNavigator");
        else this.props.navigation.navigate("MainTabNavigator");
    }

    render() {
        return <FindMeSpinner></FindMeSpinner>
    }
}

LandingPageWrapper.navigationOptions = {
    header: null
}
