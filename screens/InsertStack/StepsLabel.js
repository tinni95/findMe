import React from 'react'
import { Bold } from '../../components/StyledText';
import { StyleSheet } from 'react-native';

export const StepsLabel= (props) => {
    return (
    <Bold style={[props.style,styles.textHeading]}>
    {props.text}
    </Bold>
    )
}

const styles = StyleSheet.create({
    textHeading:{
       marginLeft: 5, 
       marginBottom: 15, 
       marginTop:25,
       color: '#5F5E5E' 
    }
  });