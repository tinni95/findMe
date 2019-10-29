import React from 'react';
import Ties from '../../assets/images/tie.svg';
import Colors from '../../constants/Colors';
import dimension from './dimension';

export default function Tie(props) {
  return (
    <Ties
      style={{ marginTop: 3 }}
      width={dimension}
      height={dimension}
      fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
