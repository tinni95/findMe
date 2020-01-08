import Colors from "../../constants/Colors";
import { isSmallDevice } from "../../constants/Layout";

export default {
    headerStyle: {
        borderBottomWidth: 0.5,
    },
    headerTitleStyle: {
        fontFamily: "sequel-sans-bold",
        color: Colors.blue,
        fontSize: isSmallDevice ? 12 : 14
    },
}