import {
    cacheMiddleware,
    authMiddleware,
    errorMiddleware,
    RelayNetworkLayer,
    loggerMiddleware,
    retryMiddleware,
    urlMiddleware,
} from "react-relay-network-modern";
import { AsyncStorage } from "react-native";
import { graphlEndPoint } from "../urls";
import { retryDelayInMillisecondsForAttemptNumber } from "./exponentialBackoff";
const TOKEN_KEY = "apsosfjkcaoisll032ir";

const _asyncStorageGetToken = async () => {
    return await AsyncStorage.getItem(TOKEN_KEY);
};

const middlewares = [
    urlMiddleware({
        url: "http://165.22.64.62/",
    }),
    authMiddleware({
        token: _asyncStorageGetToken()
    }),
    retryMiddleware({
        fetchTimeout: 20000, // 20 seconds for a single request to time out
        retryDelays: retryDelayInMillisecondsForAttemptNumber, // exponential back-off with termination
    }),
    loggerMiddleware(),
    errorMiddleware(),
    cacheMiddleware({
        ttl: 1000 * 10, // 10 seconds
    }),
];

const network = new RelayNetworkLayer(middlewares);
export default network;
