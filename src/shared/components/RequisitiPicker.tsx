import React, { FunctionComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Body } from "./StyledText";
import Colors from "../constants/Colors";

type HeaderProps = {
  selected: boolean;
  text: string;
};

const RequisitiPicker: FunctionComponent<HeaderProps> = ({
	selected,
	text
}) => (
	<View
		style={{
			flexDirection: "row",
			marginTop: 25,
			marginLeft: 20,
			alignContent: "center",
			alignItems: "center"
		}}
	>
		<View style={selected ? styles.pallinoblu : styles.pallino} />
		<Body style={{ marginLeft: 20 }}>{text}</Body>
	</View>
);

const styles = StyleSheet.create({
	pallino: {
		height: 25,
		width: 25,
		borderRadius: 12.5,
		borderColor: Colors.black,
		borderWidth: 1
	},
	pallinoblu: {
		height: 25,
		width: 25,
		borderRadius: 12.5,
		backgroundColor: Colors.blue
	}
});
export default RequisitiPicker;
