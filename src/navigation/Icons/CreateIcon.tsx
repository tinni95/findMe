import React from "react";

import {  View, Image } from "react-native";
import {  Bold } from "../../shared/components/StyledText";
import Colors from "../../shared/constants/Colors";

function CreateIcon(props) {
	if (props.focused) {
		return (
			<View
				style={{ width: 50, justifyContent: "center", alignItems: "center" }}
			>
				<Image
					source={require("../../../assets/images/createIcon.png")}
					style={{ width: 25, height: 25 }}
				></Image>
				<Bold
					style={{
						fontSize: 9,
						textAlign: "center",
						color: Colors.red,
						marginTop: 5,
						marginRight: 2
					}}
				>
          INSERISCI
				</Bold>
			</View>
		);
	}
	return (
		<View style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
			<Image
				source={require("../../../assets/images/createIcon.png")}
				style={{ width: 25, height: 25 }}
			></Image>
			<Bold
				style={{
					fontSize: 9,
					textAlign: "center",
					marginTop: 5,
					color: "white",
					marginRight: 2
				}}
			>
        INSERISCI
			</Bold>
		</View>
	);
}


export default CreateIcon;
