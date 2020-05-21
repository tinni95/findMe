import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { width, isBigDevice } from "../../constants/Layout";
import PostCardPublisher from "./PostCardPublisher";
import PostCardText from "./PostCardText";
import RoundButtonEmpty from "../RoundButtonEmpty";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export const PostCardEdit = ({ navigation, post, onPress, deletePost }) => {
	return (
		<View style={styles.wrapper}>
			<View style={styles.card}>
				<View style={styles.body}>
					<PostCardPublisher post={post} navigation={navigation} />
					<LinearGradient colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
					<PostCardText post={post} />
					<TouchableOpacity onPress={() => deletePost()} style={styles.trash}>
						<Ionicons
							name={"ios-trash"}
							size={25}
							style={{ padding: 5 }}
							color={Colors.blue}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.footer}>
					<View style={styles.buttonContainer}>
						<View style={{ height: 10 }}></View>
						<RoundButtonEmpty
							buttonStyle={{ paddingLeft: 10, paddingRight: 10 }}
							text="Visualizza"
							isMedium
							onPress={onPress}
							color={Colors.blue}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		alignItems: "center"
	},
	card: {
		height: isBigDevice ? 250 : 200,
		marginBottom: 5,
		paddingBottom: 5,
		width: isBigDevice ? undefined : width,
		backgroundColor: "white"
	},
	body: {
		flex: 7,
		flexDirection: "row"
	},
	footer: {
		flex: 3,
		flexDirection: "row"
	},
	buttonContainer: {
		alignItems: "center",
		margin: 5,
		flex: 6
	},
	line: {
		flex: 0.01,
		backgroundColor: "black"
	},
	trash: {
		alignItems: "center",
		width: 35,
		height: 35,
		margin: 5,
		borderRadius: 15
	}
});

export default PostCardEdit;
