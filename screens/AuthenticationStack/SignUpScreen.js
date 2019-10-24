import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { SignUp } from "../../mutations/AuthenticationStack"
import { AsyncStorage } from "react-native";
import t from "tcomb-form-native";
import { width } from "../../constants/Layout";
const TOKEN_KEY = "apsofjkcaoisll032ir";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
var _ = require("lodash");

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.controlLabel.normal.color = "#5F5E5E";
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.borderBottomColor = "#838383";
stylesheet.textboxView.error.borderBottomColor = "#B19393";

const stylesheet1 = {
    ...stylesheet,
    fieldset: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    formGroup: {
        normal: { width: width * 42.5 / 100, marginBottom: 10 },
        error: { flex: 0.9 }
    }
}

const Form = t.form.Form;

const SignUpFirstForm = t.struct({
    nome: t.String,
    cognome: t.String,
});
const SignUpForm = t.struct({
    email: t.String,
    password: t.String,
    repassword: t.String,
});

const options = {
    stylesheet,
    auto: 'placeholders',
};

const options1 = {
    stylesheet: stylesheet1,
    auto: 'placeholders',
};

const _asyncStorageSaveToken = async token => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
};

export default class SignUpScreen extends React.Component {
    handleSubmit = () => {
        const value = this._form.getValue();
        console.log("value: ", value);
        if (value !== null) {

        }
    };

    signUp = async () => {
        const { email, password, name } = this.state;
        const { token } = await SignUp({ email, password, name });
        await _asyncStorageSaveToken(token);
        this.props.navigation.navigate("MainTabNavigator");
    }

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
                <KeyboardAwareScrollView>
                    <View style={styles.formContainer}>
                        <Form
                            type={SignUpFirstForm}
                            ref={c => (this._form = c)}
                            options={options1}
                        />
                        <Form
                            type={SignUpForm}
                            ref={c => (this._form = c)}
                            options={options}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.buttonsContainer}>

                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        marginTop: 20
    },
    formContainer: {
        flex: 2,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonsContainer: {
        flex: 2,
        alignItems: "center"
    }
})