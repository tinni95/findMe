import { Dimensions } from "react-native";

export const { width } = Dimensions.get("window");
export const { height } = Dimensions.get("window");
export const isSmallDevice = width < 375 || height < 700;
export const isBigDevice = width > 1200 || height > 1000;