import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { isSmallDevice } from '../../../constants/Layout';
import HeaderRight from '../../../components/HeaderRight';
import { validatePassword } from "../validators"
import { Ionicons } from "@expo/vector-icons";
import TenditTextInput from '../../../components/TenditTextInput';
import HeaderLeft from '../../../components/HeaderLeft';

export default function PasswordPage({ navigation }) {
    const { user } = navigation.state.params;
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [rePasswordError, setRePasswordError] = useState("")
    const [passHidden, setPassHidden] = useState(true)
    const [repassHidden, setRePassHidden] = useState(true)
    let preinput = useRef();
    let input = useRef();

    useEffect(() => {
        preinput.current.focus()
    }, [])

    useEffect(() => {
        navigation.setParams({ login })
    }, [password, rePassword])

    const login = () => {
        if (!validatePassword(password)) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
        if (password != rePassword) {
            setRePasswordError(true)
        }
        else {
            setRePasswordError(false)
        }
        if (validatePassword(password) && password == rePassword) {
            navigation.navigate("PrivacyPage", { ...user, password })
        }
    }

    return (
        <View style={styles.container}>
            <View >
                <TenditTextInput
                    reference={preinput}
                    label='Password'
                    secureTextEntry={passHidden}
                    value={password}
                    autoCapitalize="none"
                    hintError={passwordError}
                    hintText={"Invalid password"}
                    placeholder={"password"}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={() => input.current.focus()}
                />
                <TouchableOpacity onPress={() => setPassHidden(!passHidden)} style={styles.wrapper}>
                    <Ionicons
                        name={"ios-eye"}
                        size={25}
                        style={{ padding: 5 }}
                        color={"black"}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <TenditTextInput
                    reference={input}
                    label='Repeat Password'
                    value={rePassword}
                    secureTextEntry={repassHidden}
                    autoCapitalize="none"
                    hintError={rePasswordError}
                    hintText={"Password do not match"}
                    placeholder={"password"}
                    onChangeText={text => setRePassword(text)}
                    onSubmitEditing={() => login()}
                />
                <TouchableOpacity onPress={() => setRePassHidden(!repassHidden)} style={styles.wrapper}>
                    <Ionicons
                        name={"ios-eye"}
                        size={25}
                        style={{ padding: 5 }}
                        color={"black"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

PasswordPage.navigationOptions = ({ navigation }) => {
    return {
        headerRight:
            (<HeaderRight text={"Next"} onPress={() => navigation.getParam("login")()} />),
        headerLeft:
            (
                <HeaderLeft navigation={navigation} />
            )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        alignSelf: "center",
        right: 25,
        top: 15
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10
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
