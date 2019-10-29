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
import { TOKEN_KEY } from "../Token"

const _asyncStorageGetToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    console.log(token);
    return token
};

const middlewares = [
    urlMiddleware({
        url: graphlEndPoint,
    }),
    authMiddleware({
        token: _asyncStorageGetToken()
    }),
    retryMiddleware({
        fetchTimeout: 20000, // 20 seconds for a single request to time out
        retryDelays: retryDelayInMillisecondsForAttemptNumber, // exponential back-off with termination
    }),
    loggerMiddleware(),
    cacheMiddleware({
        ttl: 1000 * 10, // 10 seconds
    }),
];

const network = new RelayNetworkLayer(middlewares);
export default network;
