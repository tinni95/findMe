import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import HomeStack from './HomeStack';
import UserModal from './UserFirstTime';
import InsertStack from './InsertStack';
import ServiziStack from './ServiziStack';
import ProfileStack from './ProfileStack';

const MainTabNavigator = createBottomTabNavigator({
  UserModal,
  HomeStack,
  InsertStack,
  ServiziStack,
  ProfileStack
});

MainTabNavigator.path = '';

export default createAppContainer(MainTabNavigator);
