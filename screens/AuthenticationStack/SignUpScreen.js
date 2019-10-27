import React from "react";
import { Keyboard, View, StyleSheet, Image, TextInput } from "react-native";
import { SignUp } from "../../mutations/AuthenticationStack";
import { isSmallDevice } from "../../constants/Layout"
import { AsyncStorage } from "react-native";
import { Bold } from "../../components/StyledText"
const TOKEN_KEY = "apsofjkcaoisll032ir";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
var _ = require("lodash");
import RoundButtonEmpty from "../../components/shared/RoundButtonEmpty";
import RoundButton from "../../components/shared/RoundButton";

const _asyncStorageSaveToken = async token => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
};

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validateName = (name) => {
    var re = /[a-z]{1,10}/;
    return re.test(name);
}

const validatePassword = (password) => {
    var re = /(?=.*[0-9])/;
    return re.test(password);
}

const validateRePassword = (password, repassword) => {
    return password === repassword;
}

export default class SignUpScreen extends React.Component {
    state = {
        name: '', surname: '', email: '', password: '', repassword: '',
        nameError: '', surnameError: '', emailError: '', passwordError: '', repasswordError: '',
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

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    signUp = async () => {
        const { email, password, name } = this.state;
        try {
            const { token } = await SignUp({ email, password, name, onError: () => alert("questa email è gia in uso"), onCompleted: () => null });
            fail();
        } catch (error) {
            console.log(error)
            return;
        }

        await _asyncStorageSaveToken(token);
        console.log(token);
        this.props.navigation.navigate("MainTabNavigator");
    }
    validateForm = () => {
        const { nameError, surnameError, emailError,
            passwordError, repasswordError } = this.state;
        return !nameError && !surnameError && !emailError
            && !passwordError && !repasswordError;
    }

    handleSubmit = async () => {
        if (!validateName(this.state.name)) {
            await this.setState({ nameError: true })
        }
        else {
            await this.setState({ nameError: false })
        }
        if (!validateName(this.state.surname)) {
            await this.setState({ surnameError: true })
        }
        else {
            await this.setState({ surnameError: false })
        }
        if (!validateEmail(this.state.email)) {
            await this.setState({ emailError: true })
        }
        else {
            await this.setState({ emailError: false })
        }
        if (!validatePassword(this.state.password)) {
            await this.setState({ passwordError: true })
        }
        else {
            await this.setState({ passwordError: false })
        }
        if (!validateRePassword(this.state.password, this.state.repassword)) {
            await this.setState({ repasswordError: true })
        }
        else {
            await this.setState({ repasswordError: false })
        }
        if (this.validateForm()) {
            this.signUp();
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.keyboardShown ? null :
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.header}
                            source={require('../../assets/images/logo_negative.png')}
                            resizeMode="contain"
                        />
                    </View>
                }
                <View style={styles.formContainer}>
                    <View style={styles.inputHalfsContainer}>
                        <View
                            style={styles.inputHalfContainer}>
                            <TextInput
                                style={this.state.nameError ? styles.inputHalfError : styles.inputHalf}
                                placeholder='Nome'
                                autoCapitalize="none"
                                placeholderTextColor='#ADADAD'
                                onChangeText={val => this.onChangeText('name', val)}
                                onSubmitEditing={() => this.surname.focus()}
                            />
                            {this.state.nameError ? <Bold style={styles.error}>Campo Obbligatorio</Bold> : <View style={styles.separator} />}
                        </View>

                        <View
                            style={styles.inputHalfContainer}>
                            <TextInput
                                style={this.state.surnameError ? styles.inputHalfError : styles.inputHalf}
                                placeholder='Cognome'
                                autoCapitalize="none"
                                placeholderTextColor='#ADADAD'
                                onChangeText={val => this.onChangeText('surname', val)}
                                ref={(input) => this.surname = input}
                                onSubmitEditing={() => this.email.focus()}
                            />
                            {this.state.surnameError ? <Bold style={styles.error}>Campo Obbligatorio</Bold> : <View style={styles.separator} />}
                        </View>
                    </View>
                    <TextInput
                        style={this.state.emailError ? styles.inputError : styles.input}
                        placeholder='Email'
                        autoCapitalize="none"
                        placeholderTextColor='#ADADAD'
                        onChangeText={val => this.onChangeText('email', val)}
                        ref={(input) => this.email = input}
                        onSubmitEditing={() => this.password.focus()}
                    />
                    {this.state.emailError ? <Bold style={styles.error}>Email non valida</Bold> : <View style={styles.separator} />}
                    <TextInput
                        style={this.state.passwordError ? styles.inputError : styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor='#ADADAD'
                        onChangeText={val => this.onChangeText('password', val)}
                        ref={(input) => this.password = input}
                        onSubmitEditing={() => this.repassword.focus()}
                    />
                    {this.state.passwordError ? <Bold style={styles.error}>Password non valida</Bold> : <View style={styles.separator} />}
                    <TextInput
                        style={this.state.repasswordError ? styles.inputError : styles.input}
                        placeholder='Ripeti Password'
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholderTextColor='#ADADAD'
                        onChangeText={val => this.onChangeText('repassword', val)}
                        ref={(input) => this.repassword = input}
                    />
                    {this.state.repasswordError ? <Bold style={styles.error}>Le password non corrispondono</Bold> : <View style={styles.separator} />}
                </View>
                <View style={styles.buttonsContainer}>
                    <RoundButtonEmpty onPress={this.handleSubmit} isLong={true} fontColor={"#DD1E63"} text={"Registrati"} fontColor={"#DD1E63"} color={"#DD1E63"}></RoundButtonEmpty>
                    <Bold style={styles.buttonText}>O continua Con</Bold>
                    <RoundButton bold={true} isLong={true} fontColor={"#10436E"} text={"Facebook"} color={"#10436E"}></RoundButton>
                    <RoundButtonEmpty bold={true} isLong={true} fontColor={"#794545"} text={"Google"} color={"#white"}></RoundButtonEmpty>
                </View>
            </View >
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    input: {
        width: "100%",
        height: 55,
        padding: 8,
        borderBottomWidth: 0.5,
        color: '#5F5E5E',
        borderRadius: 14,
        fontSize: isSmallDevice ? 14 : 16,
        fontWeight: '500',
    },
    inputError: {
        width: "100%",
        height: 55,
        padding: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: "red",
        color: '#5F5E5E',
        borderRadius: 14,
        fontSize: isSmallDevice ? 14 : 16,
        fontWeight: '500',
    },
    inputHalf: {
        width: "100%",
        height: 55,
        padding: 8,
        borderBottomWidth: 0.5,
        color: '#5F5E5E',
        borderRadius: 14,
        fontSize: isSmallDevice ? 14 : 16,
        fontWeight: '500',
    },
    inputHalfError: {
        width: "100%",
        height: 55,
        padding: 8,
        borderBottomWidth: 0.5,
        color: '#5F5E5E',
        borderRadius: 14,
        borderBottomColor: "red",
        fontSize: isSmallDevice ? 14 : 16,
        fontWeight: '500',
    },
    inputHalfContainer: {
        flexDirection: "column",
        width: "50%"
    },
    inputHalfsContainer: {
        flexDirection: "row"
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 20
    },
    formContainer: {
        margin: isSmallDevice ? 30 : 40,
        marginTop: isSmallDevice ? 40 : 60,
        justifyContent: "center",
    },
    buttonsContainer: {
        flex: isSmallDevice ? 10 : 7.5,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    buttonText: {
        margin: isSmallDevice ? 5 : 15,
        color: "#AC8A8A"
    },
    error: {
        color: "red",
        textAlign: "right",
        fontSize: isSmallDevice ? 10 : 12,
        marginRight: 10,
        marginTop: 2.5,
        marginBottom: -10
    },
    separator: { height: 5 }
})