import { createStackNavigator, createAppContainer } from "react-navigation";

import {
  LoginScreen,
  LandingPage,
  RegisterPage,
  EmailPage,
  PasswordPage,
  PasswordForgot,
  PrivacyPage
} from "../screens/AuthenticationStack";

export default createAppContainer(
  createStackNavigator({
    LandingPage,
    LoginScreen,
    PasswordForgot,
    RegisterPage,
    EmailPage,
    PasswordPage,
    PrivacyPage
  })
);
