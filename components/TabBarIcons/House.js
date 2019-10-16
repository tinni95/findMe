import React from 'react';
import Houses from "../../assets/images/house.svg";
import Colors from '../../constants/Colors';
import dimension from "./dimension";
export default function House(props) {
    return (
        <Houses
            style={{ marginTop: 3 }}
            width={dimension} height={dimension}
            fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}
