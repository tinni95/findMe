import { createStackNavigator, createAppContainer } from "react-navigation";

import {
  LoginScreen,
  LandingPage,
  SignUpScreen
} from "../screens/AuthenticationStack";

export default createAppContainer(
  createStackNavigator({
    LandingPage,
    LoginScreen,
    SignUpScreen
  })
);
