import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationStack from './AuthenticationStack';

export default createAppContainer(
  createSwitchNavigator({
    MainTabNavigator,
    MainTabNavigator
  })
);
