import React from 'react';
import { createStackNavigator } from 'react-navigation';

import ExploreModal from './ExploreModal';
import AttivitàScreen from '../../../screens/Explore/Attività/AttivitàScreen';
import ApplyScreen from '../../../screens/Post/ApplyScreen';
import PostScreen from '../../../screens/Post/PostScreen';
import ApplicationReceivedChat from '../../../screens/Post/ApplicationReceivedChat';
import ApplicationSentChat from '../../../screens/Post/ApplicationSentChat';
import FiltersModal from "../FiltersModal";
import PostIdeaIcon from '../../../components/PostIdeaIcon';
import UserVisitsProfileScreen from "../../../screens/UserVisitsProfile/UserVisitProfileScreen"

const PostIdeaStack = createStackNavigator({
  Explore: ExploreModal,
  PostScreen,
  FiltersModal,
  AttivitàScreen,
  ApplyScreen,
  ApplicationReceivedChat,
  ApplicationSentChat,
  UserVisitsProfileScreen
});

PostIdeaStack.navigationOptions = {
  tabBarLabel: 'Post idea',
  tabBarOptions: {
    activeTintColor: '#10426E',
    inactiveTintColor: '#43494A',
  },
  tabBarIcon: ({ focused }) => <PostIdeaIcon focused={focused} />
};

PostIdeaStack.path = '';

export default PostIdeaStack;
