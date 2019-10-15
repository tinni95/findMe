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
        if (token !== null) this.props.navigation.navigate("MainTabNavigator");
        else his.props.navigation.navigate("LandingPage");
    }

    render() {
        return <FindMeSpinner></FindMeSpinner>
    }
}

LandingPageWrapper.navigationOptions = {
    header: null
}
