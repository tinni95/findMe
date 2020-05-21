import React from "react";
import { Text } from "react-native";

export function Avenir(props) {
	return <Text {...props} style={[props.style, { fontFamily: "Avenir" }]} />;
}

export function Body(props) {
	return (
		<Text {...props} style={[props.style, { fontFamily: "sequel-sans" }]} />
	);
}

export function Bold(props) {
	return (
		<Text
			{...props}
			style={[props.style, { fontFamily: "sequel-sans-bold" }]}
		/>
	);
}

export function Light(props) {
	return (
		<Text
			{...props}
			style={[props.style, { fontFamily: "sequel-sans-light" }]}
		/>
	);
}

export function Changa(props) {
	return (
		<Text {...props} style={[props.style, { fontFamily: "changa-one" }]} />
	);
}
