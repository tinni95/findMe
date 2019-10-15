
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { InsertFlowHome, InsertSecondScreen } from "../../screens/InsertStack";
import Add from '../../components/TabBarIcons/Add';

const InsertStack = createStackNavigator(
    {
        InsertFlowHome,
        InsertSecondScreen,
    }
);

InsertStack.navigationOptions = {
    tabBarLabel: 'Inserisci',
    tabBarIcon: ({ focused }) => (
        <Add
            focused={focused}
        />
    ),
};

InsertStack.path = '';

export default InsertStack;