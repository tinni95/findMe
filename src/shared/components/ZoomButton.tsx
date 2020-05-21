/* eslint no-unused-vars: 0 */
import React, { FunctionComponent } from "react";
import RoundButton from "./RoundButton";
import { View, GestureResponderEvent } from "react-native";
import Colors from "../constants/Colors";

type ZoomButtonProps = {
    onPress: (event:GestureResponderEvent )=> void
};
  
const ZoomButton: FunctionComponent<ZoomButtonProps> = ({ onPress }) => {
	return (
		<View style={{ alignItems: "center", marginTop: 20 }}>
			<RoundButton
				onPress={onPress}
				color={Colors.red}
				text={"VAI"}
				textColor={"white"}
			/>
		</View>
	);
};
  
export default ZoomButton;
