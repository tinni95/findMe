import React from 'react';
import { Image } from "react-native";

const components = {
  Science: require('../../assets/images/laboratory.png'),
  It: require('../../assets/images/Computer.png'),
  Economics: require('../../assets/images/economics.png'),
  Engineering: require('../../assets/images/engineer.png'),
  Movie: require('../../assets/images/masks.png'),
  Other: require('../../assets/images/worldwide.png'),
  Law: require('../../assets/images/auction.png')
};

export default function FieldIcon(props) {
  const FieldIcon =
    components[props.field] === undefined ? components.Other : components[props.field];

  return (
    <Image
      source={FieldIcon}
      style={{ width: 28, height: 30 }}
    />
  );
}
