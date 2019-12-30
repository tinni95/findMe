import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import HomeStack from './HomeStack';
import LinksStack from './LinksStack';
import InsertStack from './InsertStack';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';

const MainTabNavigator = createBottomTabNavigator({
  LinksStack,
  HomeStack,
  InsertStack,
  ChatStack,
  ProfileStack
});

MainTabNavigator.path = '';

export default createAppContainer(MainTabNavigator);
