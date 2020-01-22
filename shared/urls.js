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

export const socketEndPoint =/*  "http://167.172.161.31/" */
  Platform.OS === "web"
    ? "http://localhost:3001/"
    : "http://localhost:3001/".replace("localhost", getLocalHostName());

export const graphlEndPoint =/*  "http://167.172.161.31/" */
  Platform.OS === "web"
    ? "http://localhost:4000/"
    : "http://localhost:4000/".replace("localhost", getLocalHostName());

export const graphlWsEndPoint = /* "ws://167.172.161.31/" */
  Platform.OS === "web"
    ? "ws://localhost:4000/"
    : "ws://localhost:4000/".replace("localhost", getLocalHostName());
