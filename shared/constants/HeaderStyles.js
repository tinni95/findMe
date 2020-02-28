import Colors from "../constants/Colors";
import { isSmallDevice } from "../constants/Layout";

export const headerStyle = { borderBottomColor: "white" }
export const headerTitleStyle = {
    fontFamily: "sequel-sans-bold",
    color: Colors.blue,
    fontSize: isSmallDevice ? 14 : 16
}