import React, { FunctionComponent } from "react";

import { Body } from "./StyledText";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";

type CategoriaCardProps = {
  title: string;
  onPress: any;
};

const ServizioCard: FunctionComponent<CategoriaCardProps> = ({
	title,
	onPress
}) => (
	<TouchableOpacity onPress={onPress} style={styles.card}>
		<Body style={styles.title}>{title}</Body>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	title: {
		color: "black",
		textAlign: "center",
		fontSize: 16
	},
	card: {
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 50,
		height: 50,
		width: 150,
		borderRadius: 8,
		backgroundColor: "white",
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
	}
});

export default ServizioCard;
