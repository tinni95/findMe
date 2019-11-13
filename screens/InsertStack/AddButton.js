import React from 'react'
import { Body } from '../../components/StyledText';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const AddButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.aggiungiButton}>
            <Body style={[props.style, styles.textHeading]}>
                {props.text}
            </Body>
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