import { AsyncStorage } from "react-native"
import React, { useEffect } from "react";
import { TOKEN_KEY } from "../../shared/Token";

export default function Logout({ screenProps }) {
    const logout = async () => {
        AsyncStorage.removeItem(TOKEN_KEY).then(() => {
            screenProps.changeLoginState();
        })
    }
    useEffect(() => {
        logout()
    }, [])

    return null
}