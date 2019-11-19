import Constants from "expo-constants";
import { Platform } from "react-native";

const getLocalHostName = () => {
  // assumes you are running on LAN mode and running the server locally on port 5000
  const expoUrl = Constants.manifest.bundleUrl;

  const hostnameStartIndex = expoUrl.indexOf("//") + 2;
  const hostname = expoUrl.substring(
    hostnameStartIndex,
    expoUrl.indexOf(":", hostnameStartIndex)
  );

  return hostname;
};

export const graphlEndPoint =
  Platform.OS === "web"
    ? "http://172.20.10.2:4000/"
    : "http://localhost:4000/".replace("localhost", getLocalHostName());
