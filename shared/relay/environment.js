import { Environment, RecordSource, Store } from "relay-runtime";

import network from "./network";

const environment = new Environment({
    network: network,
    store: new Store(new RecordSource()),
});

export default environment;
