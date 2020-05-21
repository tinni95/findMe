import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Body } from "./StyledText";
import Colors from "../constants/Colors";

export default function AvatarAndVedi({ nome, image, navigateToProfile }) {
	const img = image
		? { uri: image }
		: require("../../../assets/images/placeholder.png");
	const navigate = navigateToProfile ? navigateToProfile : null;
	return (
		<TouchableOpacity onPress={navigate} style={styles.imageTextContainer}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Image source={img} style={styles.image} />
				<Text style={styles.authorInfoText}>{nome}</Text>
			</View>
			<Body style={styles.title}>Vedi Profilo</Body>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	authorInfoText: {
		fontSize: 15,
		color: "#002C3C",
		marginLeft: 5,
		textAlign: "center",
		fontFamily: "Avenir",
		fontWeight: "bold"
	},
	imageTextContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		flex: 2.5,
		marginTop: 10
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginLeft: 0,
		marginRight: 5
	},
	title: {
		marginTop: 10,
		fontSize: 12,
		color: Colors.blue
	}
});
