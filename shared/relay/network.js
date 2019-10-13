import {
    cacheMiddleware,
    errorMiddleware,
    RelayNetworkLayer,
    retryMiddleware,
    urlMiddleware,
} from "react-relay-network-modern";
import { graphlEndPoint } from "../urls";
import { retryDelayInMillisecondsForAttemptNumber } from "./exponentialBackoff";

const middlewares = [
    urlMiddleware({
        url: graphlEndPoint,
    }),
    retryMiddleware({
        fetchTimeout: 20000, // 20 seconds for a single request to time out
        retryDelays: retryDelayInMillisecondsForAttemptNumber, // exponential back-off with termination
    }),
    errorMiddleware(),
    cacheMiddleware({
        ttl: 1000 * 10, // 10 seconds
    }),
];

const network = new RelayNetworkLayer(middlewares);
export default network;
