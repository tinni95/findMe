import React from 'react';
import { View, Image, TextInput, AsyncStorage, StyleSheet } from 'react-native';
import { Login } from '../../mutations/AuthenticationStack';
import AvoidingView from './AvoidingView';
import { TOKEN_KEY } from '../../shared/Token';
import RoundButton from '../../components/shared/RoundButtonSignUpScreen';
import { isSmallDevice } from '../../constants/Layout';
import FormStyles from './FormStyles';

const _asyncStorageSaveToken = async token => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
};

export default class LoginScreen extends AvoidingView {
    state = {
        email: '',
        password: ''
    };

    login = async () => {
        let { email, password } = this.state;
        email = email.toString().toLowerCase();
        const response = await Login({ email, password });
        if (response && response.login) {
            const { token } = response.login;
            await _asyncStorageSaveToken(token);
            this.props.navigation.navigate('MainTabNavigator');
        } else {
            const { message } = response.res.errors[0];
            if (message === 'No such a user') {
                alert("l'email inserita non è riconosciuta");
            } else if (message === 'Invalid password') {
                alert('la password non è corretta');
            } else {
                alert('si è verificato un errore, per favore riprova più tardi');
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.header}
                        source={require('../../assets/images/logo_negative.png')}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={FormStyles.input}
                        autoCompleteType="email"
                        placeholder="Email"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        style={FormStyles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <RoundButton
                        onPress={this.login}
                        isLong
                        fontColor="#DD1E63"
                        text="ACCEDI"
                        color="#DD1E63"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    formContainer: {
        margin: isSmallDevice ? 30 : 40,
        marginTop: isSmallDevice ? 40 : 60,
        justifyContent: 'center'
    },
    buttonsContainer: {
        flex: isSmallDevice ? 10 : 7.5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
