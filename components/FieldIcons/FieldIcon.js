import React from 'react';
import Science from "../../assets/images/laboratory.svg";
import It from "../../assets/images/computer.svg";
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
            width={23} height={23}
            fill={props.color}
        />
    );
}
