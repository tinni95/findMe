import React from 'react';
import { Text } from "react-native"
import Science from "../../assets/images/laboratory.svg";
import It from "../../assets/images/auction.svg";
import Wellbeing from "../../assets/images/heart.svg";
import Economics from "../../assets/images/economics.svg";
import Engineering from "../../assets/images/engineer.svg";
import Movie from "../../assets/images/masks.svg";
import Other from "../../assets/images/worldwide.svg";
import Law from "../../assets/images/auction.svg";

const components = {
    Science,
    It,
    Wellbeing,
    Economics,
    Engineering,
    Movie,
    Other,
    Law,
};

export default function FieldIcon(props) {
    const FieldIcon = components[props.field];
    return (
        <FieldIcon
            style={{ marginTop: 8 }}
            width={props.size ? props.size : 20} height={props.size ? props.size : 20}
            fill={props.color}
        />
    );
}
