import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import CategoriaItem from './CategoriaItem';
var shortid = require("shortid")
const categorie = [
    "Mondo", "Italia", "Economia", "Finanza", "Risparmio", "Norme", "Management", "Cultura", "Tech"
]

export default function Filters(props) {
    return (
        <ScrollView horizontal={true}>
            {categorie.map((categoria, index) => {
                let isActive = props.filters.includes(index);
                return (
                    <TouchableOpacity key={shortid.generate()} onPress={() => isActive ? props.removeFilter(index) : props.addFilter(index)}>
                        <CategoriaItem isActive={isActive} >{categoria}</CategoriaItem>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}