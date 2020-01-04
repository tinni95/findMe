import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import PostIdeaStack from './PostIdeaStack';
import LinksStack from './LinksStack';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';
import NotificaStack from "./NotificaStack"

const MainTabNavigator = createBottomTabNavigator({
  LinksStack,
  ChatStack,
  PostIdeaStack,
  ProfileStack,
  Notifiche: NotificaStack
});

MainTabNavigator.path = '';

export default createAppContainer(MainTabNavigator);
