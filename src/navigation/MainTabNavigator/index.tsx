import React, { useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PostIdeaStack from './PostIdeaStack';
import ProfileStack from './ProfileStack';
import InsertStack from './InsertStack';
import NotificaStack from './NotificaStack';
import ProfiloIcon from '../Icons/ProfiloIcon';
import PostIdeaIcon from '../Icons/PostIdeaIcon';
import CreateIcon from '../Icons/CreateIcon';
import CandidatureIcon from '../../shared/components/CandidatureIcon';
import Colors from '../../shared/constants/Colors';

const TabNavigator = createBottomTabNavigator(
  {
    PostIdeaStack,
    InsertStack,
    ProfileStack,
    NotificaStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'PostIdeaStack') {
          return <PostIdeaIcon focused={focused}></PostIdeaIcon>;
        } else if (routeName === 'InsertStack') {
          return <CreateIcon focused={focused}></CreateIcon>;
        } else if (routeName === 'ProfileStack') {
          return <ProfiloIcon focused={focused}></ProfiloIcon>;
        } else if (routeName === 'ProfileStack') {
          return <ProfiloIcon focused={focused}></ProfiloIcon>;
        }
        // You can return any component that you like here!
        return <CandidatureIcon focused={focused}></CandidatureIcon>;
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: Colors.blue,
        height: 70,
      },
      showLabel: false,
      activeTintColor: Colors.blue,
    },
  },
);

export default createAppContainer(TabNavigator);
