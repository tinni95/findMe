import React from "react"
import { createStackNavigator } from 'react-navigation';
import QuestionScreen from '../../../screens/HomeStack/QuestionScreen';
import CreateCommentScreen from '../../../screens/HomeStack/CreateCommentScreen';

export const QuestionScreenModal = createStackNavigator(
    {
        QuestionScreen,
        CreateCommentScreen
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

QuestionScreenModal.navigationOptions = {
    header: null
}