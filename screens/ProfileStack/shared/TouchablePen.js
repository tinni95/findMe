import React from "react"
import { TouchableOpacity, Image } from "react-native"

export default function TouchablePen({ size, onPress, penStyle }) {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <Image source={require("../../../assets/images/pen.png")} style={[{ width: size, height: size, marginRight: 15 }, penStyle]} />
        </TouchableOpacity>
    )
}