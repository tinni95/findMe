import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from 'react-native-paper';
import { width } from "../../constants/Layout"
import { TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SignUp } from "../../mutations/AuthenticationStack"

const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: '#7CEA9C',
        accent: 'white',
    },
};

export default class SignUpScreen extends React.Component {
    state = {
        email: '',
        password: '',
        name: ''
    };

    signUp = () => {
        const { email, password, name } = this.state;
        SignUp({ email, password, name })
    }

    render() {
        return (
            <PaperProvider theme={theme}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TextInput
                            style={styles.input}
                            label='Name'
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                        />
                        <TextInput
                            style={styles.input}
                            autoCompleteType="email"
                            label='Email'
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            style={styles.input}
                            label='Password'
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button style={styles.button} mode="contained" onPress={() => this.signUp()}>
                            Sign Up
                     </Button>
                    </View>
                </View>
            </PaperProvider>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#02394D"
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        margin: 20,
        width: width - 40,
    },
    buttonWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        color: "white",
        backgroundColor: "#7CEA9C",
    },
})