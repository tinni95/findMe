import React from 'react';
import Profiles from "../../assets/images/profile.svg";
import Colors from '../../constants/Colors';

export default function Profile(props) {
    return (
        <Profiles
            style={{ marginTop: 3 }}
            width={30} height={30}
            fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}
