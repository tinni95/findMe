import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import PostIdeaStack from './PostIdeaStack';
import LinksStack from './LinksStack';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';

const MainTabNavigator = createBottomTabNavigator({
  LinksStack,
  ChatStack,
  PostIdeaStack,
  ProfileStack
});

MainTabNavigator.path = '';

export default createAppContainer(MainTabNavigator);
