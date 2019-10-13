import React from "react";
import { View } from "react-native";
import FieldIcon from "./FieldIcon";

export default function FieldIconRound(props) {
    return (
        <View style={{ alignItems: "center", backgroundColor: props.bg, height: 40, width: 40, borderRadius: 20 }}>
            <FieldIcon
                {...props}
            />
        </View>
    );
}
