import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';
import TextWithArrow from "../../components/TextWithArrow";
export default class LoginScreen extends React.Component {
    state = {
        email: '',
        password: ''
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        autoCompleteType="email"
                        label='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        label='Password'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <TouchableOpacity style={styles.button}>
                    <TextWithArrow text={"Seleziona la categoria"} color={"#00B6BE"} />
                </TouchableOpacity>
            </View>
        );
    }

}

LoginScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#02394D"
    },
    header: {
        flex: 3,
        height: undefined,
        width: undefined
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255,0.2)"
    }
})