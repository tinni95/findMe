import React from 'react'
import { Bold } from '../../components/StyledText';
import { StyleSheet, View } from 'react-native';

export const StepsLabel = (props) => {
    return (
        <Bold style={[styles.textHeading, props.style]}>
            {props.text}
        </Bold>
    )
}

export const StepsLabelError = (props) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <Bold style={[props.style, styles.textHeading, styles.error]}>
                {props.text}
            </Bold>
            <Bold style={[props.style, styles.textHeading, styles.error]}>
                *
    </Bold>
        </View>
    )
}


const styles = StyleSheet.create({
    textHeading: {
        marginLeft: 5,
        marginBottom: 15,
        marginTop: 25,
        color: '#5F5E5E'
    },
    error: {
        color: "#DD1E63"
    }
});