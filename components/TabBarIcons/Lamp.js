import React from 'react';
import Lamps from '../../assets/images/lamp.svg';
import Colors from '../../constants/Colors';
import dimension from './dimension';

export default function Lamp(props) {
  return (
    <Lamps
      style={{ marginTop: 3 }}
      width={dimension}
      height={dimension}
      fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
