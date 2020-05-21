import Colors from "./Colors";
import { isSmallDevice } from "./Layout";

export const headerStyle = { borderBottomColor: "white" };

export const headerTitleStyle = {
	fontFamily: "sequel-sans-bold",
	color: Colors.blue,
	fontSize: isSmallDevice ? 14 : 16
};