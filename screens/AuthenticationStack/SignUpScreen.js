import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, AsyncStorage, TextInput } from 'react-native';
import { isSmallDevice } from '../../constants/Layout';
import { TOKEN_KEY } from '../../shared/Token';
import RoundButtonEmpty from '../../components/shared/RoundButtonEmptySignUpScreen';
import { validateEmail, validateName, validatePassword, validateRePassword } from './validators';
import { FormStyles } from '../shared/Form/FormStyles';
import gql from 'graphql-tag';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation } from '@apollo/react-hooks';
import FindMeSpinner from '../../shared/FindMeSpinner';
import PushNotifications from '../../shared/PushNotifications';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../../constants/Colors"
import CheckBox from 'react-native-check-box'
import WithErrorString from '../shared/Form/WithErrorString';
import { Light } from '../../components/StyledText';
import { Notifications } from 'expo';
const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!,$nome: String!, $cognome: String!) {
    signup(email: $email, password:$password,
      nome:$nome, cognome:$cognome) {
        token
    }
  }
`;

const UPDATEUSER_MUTATION = gql`
mutation updateUser($pushToken:String) {
        updateUser(pushToken: $pushToken) {
          pushToken
          nome
    }
}`;

export default function SignUpScreen({ screenProps, navigation }) {
  const handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    );
  }
  const [
    signup,
    { loading: mutationLoading, error: mutationError, error, data },
  ] = useMutation(SIGNUP_MUTATION,
    {
      onCompleted: async ({ signup }) => {
        await AsyncStorage.setItem(TOKEN_KEY, signup.token);
        screenProps.changeLoginState();
        let token = PushNotifications(updateUser)
        this._notificationSubscription = Notifications.addListener(handleNotification);
      },
      onError: (error) => {
        console.log(error)
      }
    });

  const [updateUser] = useMutation(UPDATEUSER_MUTATION,
    {
      onCompleted: async ({ updateUser }) => {
        console.log(updateUser)
      }
    });

  const [checked, setChecked] = useState(false)
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")
  const [nameError, setNameError] = useState(false)
  const [surnameError, setSurnameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [repasswordError, setRepasswordError] = useState(false)
  let isEmailUsed;
  let surnameInput = useRef();
  let emailInput = useRef();
  let passwordInput = useRef();
  let repasswordInput = useRef();

  useEffect(() => {
    isEmailUsed = mutationError && error.message.toString().includes("A unique constraint would be violated on User");
    isEmailUsed ?
      alert("l'email è gia in uso") : null
  }, [mutationError])

  //The Function called when Registrati button pressed
  const verifyFields = async () => {
    if (!validateName(name)) {
      await setNameError(true)
    } else {
      await setNameError(false)
    }
    if (!validateName(surname)) {
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
  };

  const handleSubmit = () => {
    verifyFields().then(() => {
      if (validateForm()) {
        let emails = email.toLowerCase();
        signup({ variables: { email: emails, password, nome: name, cognome: surname } })
      }
    })
  }

  //TO validate the form
  const validateForm = () => {
    return !isEmailUsed && !nameError && !surnameError && !emailError && !passwordError && !repasswordError;
  };

  return (
    mutationLoading ?
      <FindMeSpinner />
      :
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <WithErrorString
            error={nameError}
            errorText={"Campo Obbligatorio"}>
            <TextInput
              placeholder="Nome"
              onChangeText={val => setName(val)}
              style={nameError ? FormStyles.inputError : FormStyles.input}
              onSubmitEditing={() => surnameInput.current.focus()}
            />
          </WithErrorString>
          <View style={styles.spacer} />
          <WithErrorString
            error={surnameError}
            errorText={"Campo Obbligatorio"}>
            <TextInput
              placeholder="Cognome"
              onChangeText={val => setSurname(val)}
              ref={surnameInput}
              onSubmitEditing={() => emailInput.current.focus()}
              style={surnameError ? FormStyles.inputError : FormStyles.input}
            />
          </WithErrorString>
          <View style={styles.spacer} />
          <WithErrorString
            error={emailError}
            errorText={"Email non valida"}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={val => setEmail(val)}
              ref={emailInput}
              style={emailError || isEmailUsed ? FormStyles.inputError : FormStyles.input}
              onSubmitEditing={() => passwordInput.current.focus()}
            />
          </WithErrorString>
          <View style={styles.spacer} />
          <WithErrorString
            error={passwordError}
            errorText={"Password non valida"}>
            <TextInput
              style={passwordError ? FormStyles.inputError : FormStyles.input}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={val => setPassword(val)}
              secureTextEntry
              ref={passwordInput}
              onSubmitEditing={() => repasswordInput.current.focus()}
              style={emailError || isEmailUsed ? FormStyles.inputError : FormStyles.input}
              onSubmitEditing={() => passwordInput.current.focus()}
            />
          </WithErrorString>
          <View style={styles.spacer} />
          <WithErrorString
            error={repasswordError}
            errorText={"Le password non corrispondono"}>
            <TextInput
              style={repasswordError ? FormStyles.inputError : FormStyles.input}
              placeholder="Conferma Password"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={val => setRepassword(val)}
              ref={repasswordInput}
            />
          </WithErrorString>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.checkBoxWrapper}>
            <CheckBox
              isChecked={checked}
              onClick={() => setChecked(!checked)}
              checkBoxColor={Colors.blue}
            ></CheckBox>
            <Text style={{ margin: 5 }}>
              <Light >Accetto i</Light>
              <Light style={{ color: Colors.red }}> Termini e Condizioni</Light>
            </Text>
          </View>
          <View style={styles.spacer} />
          <RoundButtonEmpty
            onPress={handleSubmit}
            isLong
            isMedium
            fontColor={Colors.blue}
            text="Iscriviti"
            color={Colors.blue}
          />
          <View style={styles.spacer} />
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Light style={{ color: Colors.blue }}>Hai Già un Account? Accedi</Light>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: 20
  },
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
    marginTop: isSmallDevice ? 20 : 40,
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
  separator: { height: 5 },
  checkBoxWrapper: { flexDirection: "row", alignItems: "center", justifyContent: "center" }
});


SignUpScreen.navigationOptions = ({ navigation }) => {
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