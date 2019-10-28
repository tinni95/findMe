import React from "react";
import { Keyboard } from "react-native";

export default class AvoidingView extends React.Component {
    state = {
        keyboardShown: ''
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = async () => {
        await this.setState({ keyboardShown: true })
    }

    _keyboardDidHide = async () => {
        await this.setState({ keyboardShown: false })
    }


}

