import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { isSmallDevice } from '../../../constants/Layout';
import TenditTextInput from '../../../components/TenditTextInput';
import HeaderRight from '../../../components/HeaderRight';
import { validateEmail } from "../validators"
import HeaderLeft from '../../../components/HeaderLeft';

export default function EmailPage({ navigation }) {
    const { user, emailUsed } = navigation.state.params;
    const [email, setEmail] = useState("")
    const [reEmail, setReEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [reEmailError, setReEmailError] = useState("")

    let preinput = useRef();
    let input = useRef();

    useEffect(() => {
        preinput.current.focus()
    }, [])

    useEffect(() => {
        navigation.setParams({ login })
    }, [email, reEmail])

    const login = () => {
        if (!validateEmail(email)) {
            setEmailError(true)
        }
        else {
            setEmailError(false)
        }
        if (email != reEmail) {
            setReEmailError(true)
        }
        else {
            setReEmailError(false)
        }
        if (validateEmail(email) && email == reEmail) {
            navigation.navigate("PasswordPage", { user: { ...user, email } })
        }
    }

    return (
        <View style={styles.container}>
            <TenditTextInput
                reference={preinput}
                label='Email'
                autoCapitalize="none"
                value={email}
                hintError={emailError || emailUsed}
                hintText={emailUsed ? "email gia in uso" : "email non valida"}
                placeholder={"email"}
                onChangeText={text => setEmail(text)}
                onSubmitEditing={() => input.current.focus()}
            />
            <TenditTextInput
                reference={input}
                label='Repeat Email'
                value={reEmail}
                autoCapitalize="none"
                hintError={reEmailError}
                hintText={"Email don't match"}
                placeholder={"email"}
                onChangeText={text => setReEmail(text)}
                onSubmitEditing={() => login()}
            />
        </View>
    );
}


EmailPage.navigationOptions = ({ navigation }) => {
    return {
        headerRight:
            (<HeaderRight text={"Next"} onPress={() => navigation.getParam("login")()} />),
        headerLeft:
            (<HeaderLeft navigation={navigation} />
            )
    }
}

const styles = StyleSheet.create({
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
