import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Lamp from '../assets/images/lamp.svg';
import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Lamp
      width={23}
      height={23}
      fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
