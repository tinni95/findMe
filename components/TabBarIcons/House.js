import React from 'react';
import Houses from "../../assets/images/house.svg";
import Colors from '../../constants/Colors';

export default function House(props) {
    return (
        <Houses
            style={{ marginTop: 3 }}
            width={30} height={30}
            fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}
