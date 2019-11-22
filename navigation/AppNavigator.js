import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthenticationStack from "./AuthenticationStack";
import MainTabNavigator from "./MainTabNavigator";

export default createAppContainer(
  createSwitchNavigator({
    AuthenticationStack,
    MainTabNavigator
  })
);
