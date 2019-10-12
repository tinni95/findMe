import React from 'react';
import Lamps from "../../assets/images/lamp.svg";
import Colors from '../../constants/Colors';

export default function Lamp(props) {
    return (
        <Lamps
            style={{ marginTop: 3 }}
            width={30} height={30}
            fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}
