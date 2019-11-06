import React,{useState} from "react";
import RoundButton from "../../../../components/shared/RoundButton";

export function RoundFilterItem({text,removeItem,addItem}){
const [active,setActive] = useState(false);
return(
<RoundButton styles={{borderWidth:0.5,borderColor:"#707070"}} 
text={text} textColor={active ? "#FFF" : "#5F5E5E"}
color={active?"#DD1E63":"#FFF"} 
onPress={()=>{
    if(active){
        removeItem(text)
    }
    else{
        addItem(text)
    }
    setActive(!active)
}}/>)
}
