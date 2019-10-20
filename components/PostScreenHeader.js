import React from 'react';
import { Bold } from "./StyledText";
import { View, Image, StyleSheet } from "react-native";

export default function PostScreenHeader(props) {
    return (
        <View style={styles.container}>
            <Image resizeMode="contain" style={styles.image}
                source={props.image} />
            <Bold style={styles.text}>{props.name}</Bold>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: "row" },
    text: { fontSize: 18, color: "white", margin: 40 },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
});