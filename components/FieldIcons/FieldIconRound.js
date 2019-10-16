import React from "react";
import { View } from "react-native";
import FieldIcon from "./FieldIcon";

export default function FieldIconRound(props) {
    return (
        <View style={{ marginLeft: 2, marginRight: 4, alignItems: "center", backgroundColor: props.bg, height: 35, width: 35, borderRadius: 20 }}>
            <FieldIcon
                {...props}
            />
        </View>
    );
}
