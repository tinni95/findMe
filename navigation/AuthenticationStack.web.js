import { createBrowserApp } from "@react-navigation/web";
import { createStackNavigator } from "react-navigation";

import {
  LoginScreen,
  LandingPageWrapper,
  LandingPage,
  SignUpScreen
} from "../screens/AuthenticationStack";

const stackNavigator = createStackNavigator({
  LandingPage,
  LoginScreen,
  SignUpScreen
});

export default createBrowserApp(stackNavigator, { history: "hash" });
