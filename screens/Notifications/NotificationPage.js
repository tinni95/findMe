import React from 'react'
import { Light } from '../../components/StyledText'
import TabBarIcon from '../../components/TabBarIcon';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';

export default function NotificationPage({ navigation }) {
    return <Light>Notification page</Light>
}

NotificationPage.navigationOptions = {
    headerShown: true,
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
    headerTitleStyle: {
        fontFamily: "sequel-sans-bold",
        color: Colors.blue,
        fontSize: 12
    },
    title: "Notifiche",
    tabBarLabel: 'Notifiche',
    tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-notifications"} focused={focused} />
};