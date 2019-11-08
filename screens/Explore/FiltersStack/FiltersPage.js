import React, {useState} from 'react'
import {View,StyleSheet,Platform} from "react-native";
import {RoundFilters} from "./components/RoundFilters";
import RoundButton from '../../../components/shared/RoundButtonEmpty';

const Settori =["Aereonautica", "Fashion","Engineering"]

export default function FiltersPage({navigation,settore}){

    settore= Platform =="web" ? (settore ? settore : []) : (navigation.getParam("settore") || [])
    const [items,setItems] = useState(settore);
    const addItem= item => {
        setItems([...items,item]);
    };
    const removeItem= item => {
        setItems(items.filter(i=> i!== item));
    };
return (
    <View style={styles.container}>
        <RoundFilters wrapperStyle={{margin:20}} addItem={addItem} removeItem={removeItem} settori={Settori} settoreAttivi={settore}/>
        <View style={styles.buttonWrapper}>
        <RoundButton onPress={ () => {
            navigation.navigate("ExploreQueryRenderer",{
                settore:items
            })
            console.log(settore)
           }}
         color={"#5EDDDC"} text={"APPLICA"}/>
        </View>
    </View>
)}
FiltersPage.navigationOptions={
    title:"Filtri",
    headerTintColor: '#5F5E5E',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
}
const styles=StyleSheet.create({
container:{
    flex:1
},
buttonWrapper:{
    flex:1,
    alignSelf:"center"
}

})