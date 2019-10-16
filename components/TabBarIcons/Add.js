import React from 'react';
import Adds from "../../assets/images/add.svg";
import Colors from '../../constants/Colors';
import dimension from "./dimension";

export default function Add(props) {
    return (
        <Adds
            style={{ marginTop: 3 }}
            width={dimension} height={dimension}
            fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}
