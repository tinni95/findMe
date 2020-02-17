import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import PostIdeaStack from './PostIdeaStack';
import ProfileStack from './ProfileStack';
import NotificaStack from "./NotificaStack"

const MainTabNavigator = createBottomTabNavigator({
  PostIdeaStack,
  ProfileStack,
  Notifiche: NotificaStack
});

MainTabNavigator.path = '';

export default createAppContainer(MainTabNavigator);
