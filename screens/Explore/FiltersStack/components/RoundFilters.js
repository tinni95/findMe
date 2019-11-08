import React,{useState} from "react";
import {View,Text,StyleSheet} from "react-native";
import { RoundFilterItem } from "./RoundFilterItem";

export function RoundFilters({maximum,settori,addItem,removeItem,settoreAttivi,wrapperStyle,items}){

const filters= settori.map((settore,index) => {
    return (
    <View key={index} style={{margin:5}}>
    <RoundFilterItem maximum={maximum} items={items} addItem={addItem} removeItem={removeItem} text={settore} isActive={settoreAttivi.includes(settore)? true:false}/>
    </View>
    )
})
return  <View style={[styles.wrapper,wrapperStyle]}>{filters}</View>
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:"row",
        flexWrap: "wrap"
    }
  });
  