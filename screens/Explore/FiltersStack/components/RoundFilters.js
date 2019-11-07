import React,{useState} from "react";
import {View,Text,StyleSheet} from "react-native";
import { RoundFilterItem } from "./RoundFilterItem";

export function RoundFilters({settori,addItem,removeItem,settoreAttivi}){

const filters= settori.map((settore,index) => {
    return (
    <View key={index} style={{margin:5}}>
    <RoundFilterItem addItem={addItem} removeItem={removeItem} text={settore} isActive={settoreAttivi.includes(settore)? true:false}/>
    </View>
    )
})
return  <View style={styles.wrapper}>{filters}</View>
}

const styles = StyleSheet.create({
    wrapper:{
        margin:20,
        flexDirection:"row",
        flexWrap: "wrap"
    }
  });
  