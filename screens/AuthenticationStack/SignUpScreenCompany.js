import React from "react";
import AvoidingView from "./AvoidingView"
import { View, ScrollView, StyleSheet, Image, TextInput } from "react-native";
import { SignUp } from "../../mutations/AuthenticationStack";
import { isSmallDevice } from "../../constants/Layout"
import { AsyncStorage } from "react-native";
import { Bold } from "../../components/StyledText"
const TOKEN_KEY = "apsofjkcaoisll032ir";
import RoundButtonEmpty from "../../components/shared/RoundButtonEmptySignUpScreen";
import { validateEmail, validateName, validatePassword, validateRePassword } from "./validators"

const _asyncStorageSaveToken = async token => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
};

export default class SignUpScreenCompany extends AvoidingView {
    constructor(props) {
        super(props);
        this.state = {
            companySector: '', companyName: '', email: '', password: '', repassword: '',
            companySectorError: '', companyNameError: '', emailError: '', passwordError: '', repasswordError: '',
        }
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
        const { emailError, companySectorError,
            passwordError, companyNameError, repasswordError } = this.state;
        return !emailError && !passwordError && !repasswordError
            && !companyNameError && !companySectorError;
    }

    handleSubmit = async () => {
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
        if (!validateName(this.state.companyName)) {
            await this.setState({ companyNameError: true })
        }
        else {
            await this.setState({ companyNameError: false })
        }
        if (!validateName(this.state.companySector)) {
            await this.setState({ companySectorError: true })
        }
        else {
            await this.setState({ companySectorError: false })
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
                <ScrollView>
                    <View style={styles.formContainer}>
                        <Bold style={{ marginTop: 20, color: "#5F5E5E" }}>Contatto Personale</Bold>
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
                            onSubmitEditing={() => this.companyName.focus()}
                        />
                        {this.state.repasswordError ? <Bold style={styles.error}>Le password non corrispondono</Bold> : <View style={styles.separator} />}
                        <Bold style={{ marginTop: 20, color: "#5F5E5E" }}>Compagnia</Bold>
                        <TextInput
                            style={this.state.companyNameError ? styles.inputError : styles.input}
                            placeholder='Nome Compagnia'
                            autoCapitalize="none"
                            placeholderTextColor='#ADADAD'
                            onChangeText={val => this.onChangeText('companyName', val)}
                            onSubmitEditing={() => this.companySector.focus()}
                            ref={(input) => this.companyName = input}
                        />
                        {this.state.companyNameError ? <Bold style={styles.error}>Campo obbligatorio</Bold> : <View style={styles.separator} />}
                        <TextInput
                            style={this.state.companySectorError ? styles.inputError : styles.input}
                            placeholder='Settore'
                            autoCapitalize="none"
                            placeholderTextColor='#ADADAD'
                            ref={(input) => this.companySector = input}
                            onChangeText={val => this.onChangeText('companySector', val)}
                            onSubmitEditing={this.handleSubmit}
                        />
                        {this.state.companySectorError ? <Bold style={styles.error}>Campo obbligatorio</Bold> : <View style={styles.separator} />}
                    </View>
                    {this.state.keyboardShown ? <View style={{ height: 500 }}></View> : null}
                </ScrollView>
                <View style={styles.buttonsContainer}>
                    <RoundButtonEmpty onPress={this.handleSubmit} isLong={true} fontColor={"#DD1E63"} text={"Registrati"} fontColor={"#DD1E63"} color={"#DD1E63"}></RoundButtonEmpty>
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
        margin: isSmallDevice ? 20 : 30,
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