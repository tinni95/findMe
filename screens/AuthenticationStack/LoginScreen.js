import React, { useState, useRef } from 'react';
import { View, Text, TextInput, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';
import { TOKEN_KEY } from '../../shared/Token';
import RoundButtonEmpty from '../../components/shared/RoundButtonEmptySignUpScreen';
import { isSmallDevice } from '../../constants/Layout';
import { FormStyles } from '../shared/Form/FormStyles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import FindMeSpinner from "../../shared/FindMeSpinner";
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Light } from '../../components/StyledText';
import WithErrorString from '../shared/Form/WithErrorString';


const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password:$password) {
        token
    }
  }
`;

export default function LoginScreen({ screenProps }) {
    const [
        login,
        { loading: mutationLoading, error: mutationError, error, data },
    ] = useMutation(LOGIN_MUTATION,
        {
            onCompleted: async ({ login }) => {
                AsyncStorage.setItem(TOKEN_KEY, login.token).then(() => {
                    screenProps.changeLoginState()
                })
            }
        });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailError = mutationError && error.message.toString().includes("user");
    const passwordError = mutationError && error.message.toString().includes("password");
    let passwordInput = useRef();
    return (
        mutationLoading ?
            <FindMeSpinner />
            :
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <WithErrorString
                        error={emailError}
                        errorString={"Email non valida"}>
                        <TextInput
                            style={emailError ? FormStyles.inputError : FormStyles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={email => setEmail(email)}
                            onSubmitEditing={() => passwordInput.current.focus()}
                        />
                    </WithErrorString>
                    <View style={styles.spacer}></View>
                    <WithErrorString
                        error={passwordError}
                        errorString={"Password non valida"}>
                        <TextInput
                            autoCapitalize="none"
                            style={passwordError ? FormStyles.inputError : FormStyles.input}
                            placeholder="Password"
                            ref={passwordInput}
                            secureTextEntry
                            value={password}
                            onChangeText={password => setPassword(password)}
                        />
                    </WithErrorString>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.spacer}></View>
                    <RoundButtonEmpty
                        onPress={() => {
                            let emails = email.toString().toLowerCase();
                            login({ variables: { email: emails, password } });
                        }}
                        isLong
                        isMedium
                        fontColor={Colors.blue}
                        text="Accedi"
                        color={Colors.blue}
                    />
                    <View style={styles.spacer}></View>
                    <TouchableOpacity style={{ alignContent: "center" }}>
                        <Light style={{ color: Colors.blue }}>Password Dimenticata?</Light>
                    </TouchableOpacity>
                </View>
            </View>
    );
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
        margin: 30,
        marginTop: isSmallDevice ? 20 : 40,
        justifyContent: 'center'
    },
    buttonsContainer: {
        flex: isSmallDevice ? 10 : 7.5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    spacer: { height: 20 }
});

LoginScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {
            borderBottomWidth: 0
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10, paddingRight: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}