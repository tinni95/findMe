import React,{useState} from "react";
import RoundButton from "../../../../components/shared/RoundButton";

export function RoundFilterOneItem({text,items,addItem,isActive}){
isActive= isActive? true : false
const [active,setActive] = useState(isActive);
return(
<RoundButton styleProps={{borderWidth:0.5,borderColor:"#707070"}} 
text={text} textColor={active ? "#FFF" : "#5F5E5E"}
color={active?"#DD1E63":"#FFF"} 
onPress={props.onPress}/>)
}
