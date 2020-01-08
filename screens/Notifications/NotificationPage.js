import React from 'react'
import { Light } from '../../components/StyledText'
import TabBarIcon from '../../components/TabBarIcon';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import HeaderStyles from '../shared/HeaderStyles';

export default function NotificationPage({ navigation }) {
    return <Light>Notification page</Light>
}

NotificationPage.navigationOptions = {
    headerStyle: HeaderStyles.headerStyle,
    headerTitleStyle: HeaderStyles.headerTitleStyle,
    title: "Notifiche"
};