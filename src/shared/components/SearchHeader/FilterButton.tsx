import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import NotificaBubble from "../NotificaBubble";

export default function FilterButton(props) {
	return (
		<TouchableOpacity onPress={props.onPress} style={styles.button}>
			<Image
				source={require("../../../../assets/images/controls.png")}
				style={{ marginLeft: 10, width: 25, height: 25 }}
			/>
			<NotificaBubble count={props.filters}></NotificaBubble>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	button: {
		margin: 10,
		top: 17.5,
		flexDirection: "row"
	},
	counter: {
		fontSize: 12,
		alignSelf: "flex-end",
		margin: 5,
		marginTop: 10
	}
});
