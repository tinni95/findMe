import React from "react"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../constants/Colors";
import { Light } from "../components/StyledText"

export default function HeaderLeft({ navigation }) {
    return (
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.goBack()}>
            <Ionicons
                name={"ios-arrow-back"}
                size={25}
                style={{ marginLeft: 10 }}
                color={Colors.primary}
            ></Ionicons>
            <Light style={{ color: Colors.blue, marginLeft: 20, alignSelf: "center", fontSize: 17 }}>Indietro</Light>
        </TouchableOpacity>
    )
}