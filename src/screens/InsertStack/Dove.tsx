import React, { useState, useEffect } from "react";
import { Platform,View, StyleSheet, ScrollView,TouchableOpacity, TextInput } from "react-native";
import HeaderBarLeft from "../../shared/components/HeaderBarLeft";
import HeaderTitle from "../../shared/components/HeaderTitle";
import RoundButton from "../../shared/components/RoundButton";
import Colors from "../../shared/constants/Colors";
import { Light } from "../../shared/components/StyledText";
import LocationWithText from "../../shared/components/LocationWithText";


export default function Anteprima({ navigation }) {
	const {post} = navigation.state.params;
	const passedComune = navigation.getParam("comune",null);
	const passedRegione = navigation.getParam("regione",null);
	const passedProvincia = navigation.getParam("provincia",null);

	const procedi = () => {
		if(passedComune){
			let postToPass = {
				...post,
				comune:passedComune,
				regione:passedRegione,
				provincia:passedProvincia,
			};
			navigation.navigate("Anteprima",{post:postToPass});
		}
		else{
			alert("il luogo è obbligatorio");
		}
	};

	return (
		<ScrollView style={styles.container}>
			<HeaderBarLeft
				onPress={() => navigation.goBack()}
			></HeaderBarLeft>
			<HeaderTitle text={"Dove"}></HeaderTitle>
			<TouchableOpacity onPress={()=> navigation.navigate("AutoCompleteLocation",{path:"Dove"})}>
				{<View style={styles.locationContainer}>{passedComune?<LocationWithText color={"black"} comune={passedComune} regione={passedRegione}></LocationWithText> :<Light>Imposta la località dove vuoi pubblicare l'annuncio</Light>}</View>}
			</TouchableOpacity>
			<View style={{flex:1,margin:50,justifyContent:"center",alignItems:"center"}}>
				<RoundButton 
					onPress={()=>procedi()}
					text={"Conferma"}
					color={Colors.blue}
					textColor={"white"}/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	locationContainer:{
		margin:50,
		padding:20,
		backgroundColor:"white",
		...Platform.select({
			ios: {
				shadowColor: "black",
				shadowOpacity: 0.1,
				shadowRadius: 16
			},
			android: {
				elevation: 5
			}
		})
	},
	container: {
		backgroundColor: "#FFF",
		flex: 1,
		paddingTop: 40
	},
});


Anteprima.navigationOptions = {
	headerShown: false
};