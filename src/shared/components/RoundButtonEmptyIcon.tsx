import React, { FunctionComponent } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ViewStyle,
	StyleProp
} from "react-native";
import { Light, Bold, Body } from "./StyledText";
import { Ionicons } from "@expo/vector-icons";

type RoundButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: any;
  color: string;
  isMedium?: Boolean;
  isLight?: Boolean;
  text: string;
  iconName: string;
  iconColor: string;
};

export const RoundButtonEmptyIcon: FunctionComponent<RoundButtonProps> = ({
	buttonStyle,
	onPress,
	color,
	isMedium,
	isLight,
	text,
	iconName,
	iconColor
}) => {
	return (
		<TouchableOpacity style={[buttonStyle]} onPress={onPress}>
			<View style={[styles.container, { borderColor: color }]}>
				<Ionicons
					name={iconName}
					color={iconColor}
					size={22}
					style={{ marginRight: 10 }}
				/>
				{isMedium ? (
					<Body style={[styles.text, { color }]}>{text}</Body>
				) : isLight ? (
					<Light style={[styles.text, { color }]}>{text}</Light>
				) : (
					<Bold style={[styles.text, { color }]}>{text}</Bold>
				)}
			</View>
		</TouchableOpacity>
	);
};

export const RoundButtonEmptyIconInverted: FunctionComponent<
  RoundButtonProps
> = ({
	buttonStyle,
	onPress,
	color,
	isMedium,
	isLight,
	text,
	iconName,
	iconColor
}) => {
	return (
		<TouchableOpacity style={[buttonStyle]} onPress={onPress}>
			<View style={[styles.container, { borderColor: color }]}>
				{isMedium ? (
					<Body style={[styles.text, { color }]}>{text}</Body>
				) : isLight ? (
					<Light style={[styles.text, { color }]}>{text}</Light>
				) : (
					<Bold style={[styles.text, { color }]}>{text}</Bold>
				)}
			</View>
			<Ionicons
				name={iconName}
				color={iconColor}
				size={22}
				style={{ marginRight: 10 }}
			/>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		borderRadius: 25,
		backgroundColor: "white",
		alignSelf: "flex-start",
		alignItems: "center",
		padding: 6,
		paddingLeft: 13,
		paddingRight: 13,
		borderWidth: 0.5,
		flexDirection: "row"
	},
	text: {
		color: "white",
		fontSize: 13,
		marginLeft: 2
	}
});
