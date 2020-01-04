import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import PostIdeaStack from './PostIdeaStack';
import LinksStack from './LinksStack';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';
import NotificationPage from "../../screens/Notifications"

const MainTabNavigator = createBottomTabNavigator({
  LinksStack,
  ChatStack,
  PostIdeaStack,
  ProfileStack,
  Notifiche: NotificationPage
});

MainTabNavigator.path = '';

export default createAppContainer(MainTabNavigator);
