import { createStackNavigator, createAppContainer } from "react-navigation";

import {
  LoginScreen,
  LandingPage,
  RegisterPage,
  EmailPage,
  PasswordPage,
  PrivacyPage
} from "../screens/AuthenticationStack";

export default createAppContainer(
  createStackNavigator({
    LandingPage,
    LoginScreen,
    RegisterPage,
    EmailPage,
    PasswordPage,
    PrivacyPage
  })
);
