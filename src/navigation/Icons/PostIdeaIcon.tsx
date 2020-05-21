import React from "react";
import { View, Image } from "react-native";
import { Body, Bold } from "../../shared/components/StyledText";
import Colors from "../../shared/constants/Colors";

export default function PostIdeaIcon(props) {
	return (
		<View>
			{props.focused ? (
				<View
					style={{ width: 50, justifyContent: "center", alignItems: "center" }}
				>
					<Image
						source={require("../../../assets/images/homeIcon.png")}
						style={{ width: 25, height: 25 }}
					></Image>
					<Bold
						style={{
							fontSize: 9,
							textAlign: "center",
							marginTop: 5,
							color: Colors.red
						}}
					>
            HOME
					</Bold>
				</View>
			) : (
				<View
					style={{ width: 50, justifyContent: "center", alignItems: "center" }}
				>
					<Image
						source={require("../../../assets/images/homeIcon.png")}
						style={{ width: 25, height: 25 }}
					></Image>
					<Bold
						style={{
							fontSize: 9,
							textAlign: "center",
							color: "white",
							marginTop: 5
						}}
					>
            HOME
					</Bold>
				</View>
			)}
		</View>
	);
}
