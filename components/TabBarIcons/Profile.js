import React from 'react';
import Profiles from '../../assets/images/profile.svg';
import Colors from '../../constants/Colors';
import dimension from './dimension';

export default function Profile(props) {
  return (
    <Profiles
      style={{ marginTop: 3 }}
      width={dimension}
      height={dimension}
      fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
