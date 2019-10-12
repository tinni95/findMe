import React from 'react';
import Ties from "../../assets/images/tie.svg";
import Colors from '../../constants/Colors';

export default function Tie(props) {
    return (
        <Ties
            style={{ marginTop: 3 }}
            width={30} height={30}
            fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}
