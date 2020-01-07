import React from "react"
import { createStackNavigator } from 'react-navigation';
import QuestionScreen from '../../../screens/HomeStack/QuestionScreen';
import CreateAnswerScreen from '../../../screens/HomeStack/CreateAnswerScreen';
import CreateCommentScreen from '../../../screens/HomeStack/CreateCommentScreen';

export const QuestionScreenModal = createStackNavigator(
    {
        QuestionScreen,
        CreateAnswerScreen,
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