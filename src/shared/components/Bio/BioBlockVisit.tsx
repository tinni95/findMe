import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import UnTouchablePen from "../UnTouchablePen";
import { Body, Bold, Light } from "../StyledText";

export default function BioBlock({ bio }) {
	const [showAll, setShowAll] = useState(false);
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{ flexDirection: "row", justifyContent: "space-between" }}
			>
				<Bold style={{ color: "black", fontSize: 18 }}>Chi sono</Bold>
			</TouchableOpacity>
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					marginTop: 20
				}}
			>
				<View style={styles.bio}>
					{bio ? (
						bio.length < 150 || showAll ? (
							<Body style={{ textAlign: "left" }}>{bio}</Body>
						) : (
							<Text style={{ textAlign: "left" }}>
								<Body>{bio.slice(0, 150)}</Body>
								<Bold onPress={() => setShowAll(true)}> ...Altro</Bold>
							</Text>
						)
					) : (
						<Body>Ancora nessuna informazione</Body>
					)}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		marginBottom: 5,
		borderRadius: 8
	},
	bio: {
		paddingBottom: 30,
		justifyContent: "flex-start",
		alignItems: "flex-start"
	}
});
