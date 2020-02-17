import React, { useEffect, useRef, useState } from 'react';
import { View, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';
import { TOKEN_KEY } from '../../shared/Token';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import TenditTextInput from '../../components/TenditTextInput';
import HeaderRight from '../../components/HeaderRight';
import HeaderLeft from '../../components/HeaderLeft';
import Colors from '../../constants/Colors';
import { Light } from '../../components/StyledText';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password:$password) {
        token
    }
  }
`;

export default function LoginScreen({ screenProps, navigation }) {
    const [loginMutation] = useMutation(LOGIN_MUTATION,
        {
            onCompleted: async ({ login }) => {
                AsyncStorage.setItem(TOKEN_KEY, login.token).then(() => {
                    screenProps.changeLoginState()
                })
            },
            onError: (error) => {
                console.log(error)
                if (error.toString().includes("password")) {
                    setPasswordError(true)
                }
                else {
                    setPasswordError(false)
                }
                if (error.toString().includes("user")) {
                    setEmailError(true)
                }
                else {
                    setEmailError(false)
                }
            }
        });
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    let preinput = useRef();
    let input = useRef();

    useEffect(() => {
        preinput.current.focus()
    }, [])

    useEffect(() => {
        navigation.setParams({ login })
    }, [email, password])

    const login = () => {
        loginMutation({ variables: { email, password } })
    }

    return (
        <View style={styles.container}>
            <TenditTextInput
                reference={preinput}
                label='Email'
                autoCapitalize="none"
                value={email}
                hintError={emailError}
                hintText={"email non valida"}
                placeholder={"email"}
                onChangeText={text => setEmail(text)}
                onSubmitEditing={() => input.current.focus()}
            />
            <TenditTextInput
                reference={input}
                label='Password'
                secureTextEntry={true}
                value={password}
                autoCapitalize="none"
                hintError={passwordError}
                hintText={"password non valida"}
                placeholder={"password"}
                onChangeText={text => setPassword(text)}
                onSubmitEditing={() => login()}
            />
            <TouchableOpacity onPress={() => navigation.navigate("PasswordForgot", { email })}
                style={{ alignSelf: "flex-end", marginRight: 15, marginTop: 10 }}>
                <Light style={{ color: Colors.red }}>Password Dimenticata?</Light>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'white'
    },

});

LoginScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { borderBottomWidth: 0 },
        headerRight:
            (<HeaderRight text={"Next"} onPress={() => navigation.getParam("login")()} />),
        headerLeft:
            (<HeaderLeft navigation={navigation} />
            )
    }
}