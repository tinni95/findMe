import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import TenditTextInput from '../../components/TenditTextInput';
import HeaderRight from '../../components/HeaderRight';
import HeaderLeft from '../../components/HeaderLeft';
import { Light } from '../../components/StyledText';

const PASSWORD_RESET_MUTATION = gql`
  mutation passwordReset($email: String!) {
    askPasswordReset(email: $email) {
        id
    }
  }
`;


export default function PasswordForgot({ navigation }) {
    const passedEmail = navigation.getParam("email")
    const [resetComplete, setResetComplete] = useState(false)
    const [resetMutation] = useMutation(PASSWORD_RESET_MUTATION,
        {
            onCompleted: async ({ login }) => {
                console.log()
                setResetComplete(true)
            },
            onError: (error) => {
                console.log(error)
                if (error.toString().includes("user")) {
                    setEmailError(true)
                }
                else {
                    setEmailError(false)
                }
            }
        });

    const [email, setEmail] = useState(passedEmail)
    const [emailError, setEmailError] = useState("")
    let preinput = useRef();

    useEffect(() => {
        preinput.current.focus()
    }, [])

    useEffect(() => {
        navigation.setParams({ login })
    }, [email])

    const login = () => {
        resetMutation({ variables: { email } })
    }

    if (resetComplete) {
        return (
            <View style={styles.container2}>
                <Light>Hai ricevuto un e-mail per resettare la password, alcuni gestori segnalano l'email come spam</Light>
            </View>
        )
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
                onSubmitEditing={() => login()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'white'
    },
    container2: {
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        backgroundColor: 'white'
    },

});

PasswordForgot.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { borderBottomWidth: 0 },
        headerRight:
            (<HeaderRight text={"Next"} onPress={() => navigation.getParam("login")()} />),
        headerLeft:
            (<HeaderLeft navigation={navigation} />
            )
    }
}