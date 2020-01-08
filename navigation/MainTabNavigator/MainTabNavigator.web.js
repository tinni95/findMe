import { createBrowserApp } from "@react-navigation/web";
import { createBottomTabNavigator } from 'react-navigation';
import HomeStack from './HomeStack';
import ChatStack from './ChatStack';
import NotificaStack from "./NotificaStack"
import PostIdeaStack from './PostIdeaStack';
import ProfileStack from './ProfileStack';

const MainTabNavigator = createBottomTabNavigator({
  ChatStack,
  HomeStack,
  Notifiche: NotificaStack,
  PostIdeaStack,
  ProfileStack
});

MainTabNavigator.path = '';

export default createBrowserApp(MainTabNavigator, { history: "hash" });
