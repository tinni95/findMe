import React from "react";
import { Image } from "react-native";

export default function UnTouchablePen({ size }) {
	return (
		<Image
			source={require("../../../assets/images/pen-opaca.png")}
			style={{ width: size, height: size, marginBottom: 5 }}
		/>
	);
}
