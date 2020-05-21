import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Body } from "./StyledText";
import Colors from "../constants/Colors";

export default function AvatarAndVedi({ image, navigateToProfile }) {
	const img = image
		? { uri: image }
		: require("../../../assets/images/placeholder.png");
	const navigate = navigateToProfile ? navigateToProfile : {};
	return (
		<TouchableOpacity onPress={navigate} style={styles.imageTextContainer}>
			<Image source={img} style={styles.image} />
			<Body style={styles.title}>Vedi Profilo</Body>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
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
