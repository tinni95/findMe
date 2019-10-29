import React from 'react';
import { View, ScrollView, StyleSheet, Image, TextInput, AsyncStorage } from 'react-native';
import AvoidingView from './AvoidingView';
import { SignUp } from '../../mutations/AuthenticationStack';
import { isSmallDevice } from '../../constants/Layout';

import { Bold } from '../../components/StyledText';
import { TOKEN_KEY } from '../../shared/Token';
import RoundButtonEmpty from '../../components/shared/RoundButtonEmptySignUpScreen';
import { validateEmail, validateName, validatePassword, validateRePassword } from './validators';
import FormStyles from './FormStyles';

const _asyncStorageSaveToken = async token => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export default class SignUpScreenCompany extends AvoidingView {
  constructor(props) {
    super(props);
    this.state = {
      companySector: '',
      companyName: '',
      email: '',
      password: '',
      repassword: '',
      companySectorError: '',
      companyNameError: '',
      emailError: '',
      passwordError: '',
      repasswordError: ''
    };
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  signUp = async () => {
    const { email, password, name } = this.state;
    try {
      const { token } = await SignUp({
        email,
        password,
        name,
        onError: () => alert('questa email è gia in uso'),
        onCompleted: () => null
      });
      fail();
    } catch (error) {
      console.log(error);
      return;
    }

    await _asyncStorageSaveToken(token);
    console.log(token);
    this.props.navigation.navigate('MainTabNavigator');
  };

  validateForm = () => {
    const {
      emailError,
      companySectorError,
      passwordError,
      companyNameError,
      repasswordError
    } = this.state;
    return (
      !emailError && !passwordError && !repasswordError && !companyNameError && !companySectorError
    );
  };

  handleSubmit = async () => {
    if (!validateEmail(this.state.email)) {
      await this.setState({ emailError: true });
    } else {
      await this.setState({ emailError: false });
    }
    if (!validatePassword(this.state.password)) {
      await this.setState({ passwordError: true });
    } else {
      await this.setState({ passwordError: false });
    }
    if (!validateRePassword(this.state.password, this.state.repassword)) {
      await this.setState({ repasswordError: true });
    } else {
      await this.setState({ repasswordError: false });
    }
    if (!validateName(this.state.companyName)) {
      await this.setState({ companyNameError: true });
    } else {
      await this.setState({ companyNameError: false });
    }
    if (!validateName(this.state.companySector)) {
      await this.setState({ companySectorError: true });
    } else {
      await this.setState({ companySectorError: false });
    }
    if (this.validateForm()) {
      this.signUp();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.keyboardShown ? null : (
          <View style={styles.imageContainer}>
            <Image
              style={styles.header}
              source={require('../../assets/images/logo_negative.png')}
              resizeMode="contain"
            />
          </View>
        )}
        <ScrollView>
          <View style={styles.formContainer}>
            <Bold style={{ marginLeft: 5, marginBottom: 15, color: '#5F5E5E' }}>
              Contatto Personale
            </Bold>
            <TextInput
              style={this.state.emailError ? FormStyles.inputError : FormStyles.input}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor="#ADADAD"
              onChangeText={val => this.onChangeText('email', val)}
              ref={input => (this.email = input)}
              onSubmitEditing={() => this.password.focus()}
            />
            {this.state.emailError ? (
              <Bold style={FormStyles.error}>Email non valida</Bold>
            ) : (
                <View style={styles.separator} />
              )}
            <TextInput
              style={this.state.passwordError ? FormStyles.inputError : FormStyles.input}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#ADADAD"
              onChangeText={val => this.onChangeText('password', val)}
              ref={input => (this.password = input)}
              onSubmitEditing={() => this.repassword.focus()}
            />
            {this.state.passwordError ? (
              <Bold style={FormStyles.error}>Password non valida</Bold>
            ) : (
                <View style={styles.separator} />
              )}
            <TextInput
              style={this.state.repasswordError ? FormStyles.inputError : FormStyles.input}
              placeholder="Ripeti Password"
              autoCapitalize="none"
              secureTextEntry
              placeholderTextColor="#ADADAD"
              onChangeText={val => this.onChangeText('repassword', val)}
              ref={input => (this.repassword = input)}
              onSubmitEditing={() => this.companyName.focus()}
            />
            {this.state.repasswordError ? (
              <Bold style={FormStyles.error}>Le password non corrispondono</Bold>
            ) : (
                <View style={styles.separator} />
              )}
            <Bold style={{ marginLeft: 5, marginTop: 15, marginBottom: 15, color: '#5F5E5E' }}>
              Compagnia
            </Bold>
            <TextInput
              style={this.state.companyNameError ? FormStyles.inputError : FormStyles.input}
              placeholder="Nome Compagnia"
              autoCapitalize="none"
              placeholderTextColor="#ADADAD"
              onChangeText={val => this.onChangeText('companyName', val)}
              onSubmitEditing={() => this.companySector.focus()}
              ref={input => (this.companyName = input)}
            />
            {this.state.companyNameError ? (
              <Bold style={FormStyles.error}>Campo obbligatorio</Bold>
            ) : (
                <View style={styles.separator} />
              )}
            <TextInput
              style={this.state.companySectorError ? FormStyles.inputError : FormStyles.input}
              placeholder="Settore"
              autoCapitalize="none"
              placeholderTextColor="#ADADAD"
              ref={input => (this.companySector = input)}
              onChangeText={val => this.onChangeText('companySector', val)}
              onSubmitEditing={this.handleSubmit}
            />
            {this.state.companySectorError ? (
              <Bold style={FormStyles.error}>Campo obbligatorio</Bold>
            ) : (
                <View style={styles.separator} />
              )}
          </View>
          {this.state.keyboardShown ? <View style={{ height: 500 }} /> : null}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <RoundButtonEmpty
            onPress={this.handleSubmit}
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
