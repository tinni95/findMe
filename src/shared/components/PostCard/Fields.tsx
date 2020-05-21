import React from "react";
import { Text, Platform, StyleSheet, View, ScrollView } from "react-native";
import FieldIconRound from "../FieldIcons";
import { Tooltip } from "react-native-elements";
import { Bold } from "../StyledText";

const Fields = ({ post: { posizioni } }) => {
	let fields;
	if (Platform.OS == "web") {
		fields = posizioni.map((position, index) => {
			return (
				<FieldIconRound
					available={position.available}
					color="#26547C"
					key={index}
					field={position.field}
				/>
			);
		});
	} else {
		fields = posizioni.map((position, index) => {
			return (
				<Tooltip
					key={index}
					backgroundColor={"#10476C"}
					popover={<Text style={{ color: "white" }}>{position.titolo}</Text>}
				>
					<FieldIconRound
						available={position.available}
						color="#26547C"
						field={position.settore}
					/>
				</Tooltip>
			);
		});
	}

	return (
		<View style={styles.container}>
			<Bold style={{ color: "#AFA9A9", fontSize: 10, margin: 5 }}>
        Cosa Cerco
			</Bold>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{fields}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 3,
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default Fields;
