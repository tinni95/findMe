import React, {useState} from 'react'
import {View,StyleSheet} from "react-native";
import {RoundFilters} from "./components/RoundFilters";
import RoundButton from '../../../components/shared/RoundButtonEmpty';

const Settori =["Aereonautica", "Fashion", "Economics","Engineering"]

export default function FiltersPage({navigation}){
    const [items,setItems] = useState([]);
    const addItem= item => {
        setItems([...items,item]);
    };
    const removeItem= item => {
        setItems(items.filter(i=> i!== item));
    };
return (
    <View style={styles.container}>
        <RoundFilters addItem={addItem} removeItem={removeItem} settori={Settori}/>
        <View style={styles.buttonWrapper}>
        <RoundButton onPress={()=>navigation.navigate("ExploreQueryRenderer",{
            settore:items
        })} color={"#5EDDDC"} text={"APPLICA"}/>
        </View>
    </View>
)}

const styles=StyleSheet.create({
container:{
    flex:1
},
buttonWrapper:{
    flex:1,
    alignSelf:"center"
}

})