import React from 'react';
import Science from '../../assets/images/laboratory.png';
import It from '../../assets/images/auction.png';
import Wellbeing from '../../assets/images/heart.svg';
import Economics from '../../assets/images/economics.png';
import Engineering from '../../assets/images/engineer.png';
import Movie from '../../assets/images/masks.png';
import Other from '../../assets/images/worldwide.png';
import Law from '../../assets/images/auction.png';
import { Ionicons } from "@expo/vector-icons";
import {Image} from "react-native";

const components = {
  Science: require('../../assets/images/laboratory.png'),
  It: require('../../assets/images/auction.png'),
  Economics: require('../../assets/images/economics.png'),
  Engineering:require('../../assets/images/engineer.png'),
  Movie:require('../../assets/images/masks.png'),
  Other:require('../../assets/images/worldwide.png'),
  Law:require('../../assets/images/auction.png')
};

export default function FieldIcon(props) {
  const FieldIcon =
    components[props.field] === undefined ? components.Other : components[props.field];

  return (
    <Image
    source={FieldIcon}  
    style={{width:25,height:25}}
  />
  );
}
