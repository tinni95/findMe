import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import AuthenticationStack from './AuthenticationStack';
import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  AuthenticationStack,
  MainTabNavigator
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
