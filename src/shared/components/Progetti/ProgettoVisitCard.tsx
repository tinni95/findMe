import React from "react";
import { View, StyleSheet } from "react-native";
import { Light } from "../StyledText";
import Colors from "../../constants/Colors";
import ProgettoCard from "./ProgettoCard";


export default function ProgettoVisitCard({ progetto }) {
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<ProgettoCard
					noBorder={{ borderBottomColor: "white" }}
					item={progetto}
				></ProgettoCard>
				<View style={styles.textContainer}>
					<Light>{progetto.descrizione}</Light>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderTopColor: "#F2F2F2",
		borderTopWidth: 5
	},
	touchablePenContainer: {
		alignItems: "flex-end"
	},
	innerContainer: {
		margin: 15,
		marginTop: 0
	},
	textContainer: {
		margin: 15,
		marginTop: 20,
		marginLeft: 6
	},
	link: {
		color: Colors.blue,
		fontSize: 12
	}
});
