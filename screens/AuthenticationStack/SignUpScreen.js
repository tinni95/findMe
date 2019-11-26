import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, AsyncStorage, TextInput } from 'react-native';
import { isSmallDevice } from '../../constants/Layout';
import { Bold } from '../../components/StyledText';
import { TOKEN_KEY } from '../../shared/Token';
import RoundButtonEmpty from '../../components/shared/RoundButtonEmptySignUpScreen';
import RoundButton from '../../components/shared/RoundButtonSignUpScreen';
import { validateEmail, validateName, validatePassword, validateRePassword } from './validators';
import { FormStyles } from '../shared/Form/FormStyles';
import gql from 'graphql-tag';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation } from '@apollo/react-hooks';
import FindMeSpinner from '../../shared/FindMeSpinner';

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!,$nome: String!, $cognome: String!) {
    signup(email: $email, password:$password,
      nome:$nome, cognome:$cognome) {
        token
    }
  }
`;

export default function SignUpScreen({ navigation, screenProps }) {
  const [
    signup,
    { loading: mutationLoading, error: mutationError, error, data },
  ] = useMutation(SIGNUP_MUTATION,
    {
      onCompleted: async ({ signup }) => {
        await AsyncStorage.setItem(TOKEN_KEY, signup.token);
        screenProps.changeLoginState();
      }
    });
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")
  const [nameError, setNameError] = useState(false)
  const [surnameError, setSurnameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [emailUsed, setEmailUsed] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [repasswordError, setRepasswordError] = useState(false)
  const isEmailUsed = mutationError && error.message.toString().includes("A unique constraint would be violated on User");
  let surnameInput = useRef();
  let emailInput = useRef();
  let passwordInput = useRef();
  let repasswordInput = useRef();

  //The Function called when Registrati button pressed
  const handleSubmit = async () => {
    if (!validateName(name)) {
      await setNameError(true)
    } else {
      await setNameError(false)
    }
    if (!validateName(surname) || isEmailUsed) {
      await setSurnameError(true)
    } else {
      await setSurnameError(false)
    }
    if (!validateEmail(email)) {
      await setEmailError(true)
    } else {
      await setEmailError(false)
    }
    if (!validatePassword(password)) {
      await setPasswordError(true)
    } else {
      await setPasswordError(false)
    }
    if (!validateRePassword(password, repassword)) {
      await setRepasswordError(true)
    } else {
      await setRepasswordError(false)
    }
    if (validateForm()) {
      let emails = email.toLowerCase();
      signup({ variables: { email: emails, password, nome: name, cognome: surname } })
    }
  };

  //TO validate the form
  const validateForm = () => {
    return !isEmailUsed && !nameError && !surnameError && !emailError && !passwordError && !repasswordError;
  };

  return (
    mutationLoading ?
      <FindMeSpinner />
      :
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.header}
            source={require('../../assets/images/logo_negative.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.formContainer}>
          <View style={FormStyles.inputHalfsContainer}>
            <View style={FormStyles.inputHalfContainer}>
              <TextInput
                style={nameError ? FormStyles.inputHalfError : FormStyles.inputHalf}
                placeholder="Nome"
                placeholderTextColor="#ADADAD"
                onChangeText={val => setName(val)}
                onSubmitEditing={() => surnameInput.current.focus()}
              />
              {nameError ? (
                <Bold style={FormStyles.error}>Campo Obbligatorio</Bold>
              ) : (
                  <View style={styles.separator} />
                )}
            </View>
            <View style={FormStyles.inputHalfContainer}>
              <TextInput
                style={surnameError ? FormStyles.inputHalfError : FormStyles.inputHalf}
                placeholder="Cognome"
                placeholderTextColor="#ADADAD"
                onChangeText={val => setSurname(val)}
                ref={surnameInput}
                onSubmitEditing={() => emailInput.current.focus()}
              />
              {surnameError ? (
                <Bold style={FormStyles.error}>Campo Obbligatorio</Bold>
              ) : (
                  <View style={styles.separator} />
                )}
            </View>
          </View>
          <TextInput
            style={emailError || emailUsed ? FormStyles.inputError : FormStyles.input}
            placeholder="Email"
            placeholderTextColor="#ADADAD"
            onChangeText={val => setEmail(val)}
            ref={emailInput}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
          {emailError ? (
            <Bold style={FormStyles.error}>Email non valida</Bold>
          ) : emailUsed ? (
            <Bold style={FormStyles.error}>Email già in uso</Bold>
          ) : (
                <View style={styles.separator} />
              )}
          <TextInput
            style={passwordError ? FormStyles.inputError : FormStyles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#ADADAD"
            onChangeText={val => setPassword(val)}
            ref={passwordInput}
            onSubmitEditing={() => repasswordInput.current.focus()}
          />
          {passwordError ? (
            <Bold style={FormStyles.error}>Password non valida</Bold>
          ) : (
              <View style={styles.separator} />
            )}
          <TextInput
            style={repasswordError ? FormStyles.inputError : FormStyles.input}
            placeholder="Ripeti Password"
            autoCapitalize="none"
            secureTextEntry
            placeholderTextColor="#ADADAD"
            onChangeText={val => setRepassword(val)}
            ref={repasswordInput}
          />
          {repasswordError ? (
            <Bold style={FormStyles.error}>Le password non corrispondono</Bold>
          ) : (
              <View style={styles.separator} />
            )}
        </View>
        <View style={styles.buttonsContainer}>
          <RoundButtonEmpty
            onPress={handleSubmit}
            isLong
            fontColor="#DD1E63"
            text="Registrati"
            fontColor="#DD1E63"
            color="#DD1E63"
          />
          <Bold style={styles.buttonText}>O continua Con</Bold>
          <RoundButton
            bold
            isLong
            fontColor="#10436E"
            text="Facebook"
            color="#10436E"
          />
          <RoundButtonEmpty bold isLong fontColor="#794545" text="Google" color="#white" />
        </View>
      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  formContainer: {
    margin: 30,
    marginTop: isSmallDevice ? 40 : 60,
    justifyContent: 'center'
  },
  buttonsContainer: {
    flex: isSmallDevice ? 10 : 7.5,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonText: {
    margin: isSmallDevice ? 5 : 15,
    color: '#AC8A8A'
  },
  separator: { height: 5 }
});
