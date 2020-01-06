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

QuestionScreenModal.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {
            ...Platform.select({
                ios: {
                    shadowColor: "black",
                    shadowOffset: { height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3
                },
                android: {
                    elevation: 20
                },
            })
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}