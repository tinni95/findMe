import React from 'react';
import Adds from "../../assets/images/add.svg";
import Colors from '../../constants/Colors';

export default function Add(props) {
    return (
        <Adds
            style={{ marginTop: 3 }}
            width={30} height={30}
            fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}
