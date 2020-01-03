import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../../components/TabBarIcon';
import ExploreModal from './ExploreModal';
import AttivitàScreen from '../../../screens/Explore/Attività/AttivitàScreen';
import ApplyScreen from '../../../screens/Post/ApplyScreen';
import PostScreen from '../../../screens/Post/PostScreen';
import FiltersModal from "../FiltersModal";

const PostIdeaStack = createStackNavigator({
  Explore: ExploreModal,
  PostScreen,
  FiltersModal,
  AttivitàScreen,
  ApplyScreen
});

PostIdeaStack.navigationOptions = {
  tabBarLabel: 'Post idea',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-bulb"} focused={focused} />
};

PostIdeaStack.path = '';

export default PostIdeaStack;
