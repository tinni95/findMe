import { createStackNavigator } from "react-navigation";

import {
  LoginScreen,
  LandingPage,
  SignUpScreen
} from "../screens/AuthenticationStack";

export default createStackNavigator({
  LandingPage,
  LoginScreen,
  SignUpScreen
});
