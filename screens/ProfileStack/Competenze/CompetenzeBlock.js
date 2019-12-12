import React from "react"
import { View, TouchableOpacity } from "react-native"
import Colors from "../../../constants/Colors"
import UnTouchablePen from "../shared/UnTouchablePen"
import { Body } from "../../../components/StyledText"
import RoundButton from "../../../components/shared/RoundButton"

export default function CompetenzeBlock({ competenze, onPress }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Body style={{ color: Colors.blue }}>Competenze</Body>
                <UnTouchablePen size={15}></UnTouchablePen>
            </TouchableOpacity>
            {competenze.map(competenza => {
                return <RoundButton isLight={true} text={competenza} textColor={"white"} color={Colors.blue}></RoundButton>
            })}
        </View>
    )
}