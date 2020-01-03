import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default HeaderBar = ({ onPress }) => {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity onPress={onPress}>
                <Ionicons
                    style={{ marginLeft: 25 }}
                    name={"md-close"}
                    size={25}
                    color={"black"} />
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    headerBar: {
        borderBottomWidth: 0.3,
        borderBottomColor: "grey",
        height: 40,
        marginBottom: 20
    }
}