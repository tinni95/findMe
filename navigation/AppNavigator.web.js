import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthenticationStack from "./AuthenticationStack";

const switchNavigator = createSwitchNavigator({
  AuthenticationStack,
  AuthenticationStack
});
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });
