import { createBottomTabNavigator } from 'react-navigation';
import HomeStack from './HomeStack';
import LinksStack from './LinksStack';
import InsertStack from './InsertStack';
import ServiziStack from './ServiziStack';
import ProfileStack from './ProfileStack';

const MainTabNavigator = createBottomTabNavigator({
  LinksStack,
  HomeStack,
  InsertStack,
  ServiziStack,
  ProfileStack
});

MainTabNavigator.path = '';

export default MainTabNavigator;
