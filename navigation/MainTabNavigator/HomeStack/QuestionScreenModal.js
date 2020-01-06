import React from "react"
import { createStackNavigator } from 'react-navigation';
import QuestionScreen from '../../../screens/HomeStack/QuestionScreen';
import CreateAnswerScreen from '../../../screens/HomeStack/CreateAnswerScreen';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Platform } from "react-native"
import Colors from "../../../constants/Colors";

export const QuestionScreenModal = createStackNavigator(
    {
        QuestionScreen,
        CreateAnswerScreen
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

QuestionScreenModal.navigationOptions = {
    header: null
}