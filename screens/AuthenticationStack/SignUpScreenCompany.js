import React, {useState,useRef} from 'react';
import { View, ScrollView, StyleSheet, Image, TextInput, AsyncStorage } from 'react-native';
import AvoidingView from './AvoidingView';
import { isSmallDevice } from '../../constants/Layout';
import FormTextInput from "../shared/Form/FormTextInput";
import { Bold } from '../../components/StyledText';
import { TOKEN_KEY } from '../../shared/Token';
import RoundButtonEmpty from '../../components/shared/RoundButtonEmptySignUpScreen';
import { validateEmail, validateName, validatePassword, validateRePassword } from './validators';

const _asyncStorageSaveToken = async token => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export default function SignUpScreenCompany(){
  const [companySector,setCompanySector]= useState("");
  const [companySectorError,setCompanySectorError]= useState("");
  const [companyName,setCompanyName]= useState("");
  const [companyNameError,setCompanyNameError]= useState("");
  const [email,setEmail]= useState("");
  const [emailError,setEmailError]= useState("");
  const [password,setPassword]= useState("");
  const [passwordError,setPasswordError]= useState("");
  const [repassword,setRepassword]= useState("");
  const [repasswordError,setRepasswordError]= useState("");
  const passwordInput = useRef();
  const repasswordInput = useRef();
  const companyNameInput = useRef();
  const companySectorInput = useRef();

  const validateForm = () => {
      !emailError && !passwordError && !repasswordError && !companyNameError && !companySectorError
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      await setEmailError(true);
    } else {
      await setEmailError(false);
    }
    if (!validatePassword(password)) {
      await setPasswordError(true);
    } else {
      await setPasswordError(false);
    }
    if (!validateRePassword(password, repassword)) {
      await setRepasswordError(true);
    } else {
      await setRepasswordError(false);
    }
    if (!validateName(companyName)) {
      await setCompanyNameError(true);
    } else {
      await setCompanyNameError(false);
    }
    if (!validateName(companySector)) {
      await setCompanySectorError(true);
    } else {
      await setCompanySectorError(false);
    }
    if (validateForm()) {
      console.log("valid")
    }
  };

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <Bold style={{ marginLeft: 5, marginBottom: 15, color: '#5F5E5E' }}>
              Contatto Personale
            </Bold>
            <FormTextInput 
            placeholder="Email"
            onChangeText={val => setEmail(val)}
            errorText="Email non valida"
            error={emailError}
            nextInput={() => passwordInput.current.focus()}
             />
            <FormTextInput 
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={val => setPassword(val)}
            errorText="Password non valida"
            error={passwordError}
            reference={passwordInput}
            nextInput={() => repasswordInput.current.focus()}
             />
            <FormTextInput 
            placeholder="Ripeti Password"
            secureTextEntry={true}
            onChangeText={val => setRepassword(val)}
            errorText="Le password non corrispondono"
            error={repasswordError}
            reference={repasswordInput}
            nextInput={() => companyNameInput.current.focus()}
             />
            <Bold style={{ marginLeft: 5, marginTop: 15, marginBottom: 15, color: '#5F5E5E' }}>
              Compagnia
            </Bold>
            <FormTextInput 
            placeholder="Nome Compagnia"
            onChangeText={val => setCompanyName(val)}
            errorText="Campo Obbligatorio"
            error={companyNameError}
            reference={companyNameInput}
            nextInput={() => companySectorInput.current.focus()}
             />
        <FormTextInput 
            placeholder="Settore"
            onChangeText={val => setCompanySector(val)}
            errorText="Campo Obbligatorio"
            error={companySectorError}
            reference={companySectorInput}
             />
          </View>

        </ScrollView>
        <View style={styles.buttonsContainer}>
          <RoundButtonEmpty
            onPress={handleSubmit}
            isLong
            fontColor="#DD1E63"
            text="Registrati"
            fontColor="#DD1E63"
            color="#DD1E63"
          />
        </View>
      </View>
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
    margin: isSmallDevice ? 20 : 20,
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
