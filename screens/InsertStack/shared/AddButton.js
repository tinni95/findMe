import React from 'react'
import { Body } from '../../../components/StyledText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const AddButton = ({ onPress, style, text }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.aggiungiButton}>
                <Body style={[style, styles.textHeading]}>
                    {text}
                </Body>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textHeading: {
        color: "#DD1E63"
    },
    aggiungiButton: {
        borderWidth: 1,
        padding: 10,
        borderColor: "#DD1E63"
    },
});