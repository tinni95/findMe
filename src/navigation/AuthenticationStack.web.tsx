import { createBrowserApp } from '@react-navigation/web';
import { createStackNavigator } from 'react-navigation-stack';
import {
  LoginScreen,
  RegisterPage,
  EmailPage,
  PasswordPage,
  PasswordForgot,
  PrivacyPage,
} from '../screens/AuthenticationStack';
import { LandingPage } from '../screens/AuthenticationStack/LandingPage';

const AppNavigator = createStackNavigator({
  LandingPage,
  LoginScreen,
  RegisterPage,
  EmailPage,
  PasswordPage,
  PrivacyPage,
  PasswordForgot,
});

export default createBrowserApp(AppNavigator, { history: 'hash' });
