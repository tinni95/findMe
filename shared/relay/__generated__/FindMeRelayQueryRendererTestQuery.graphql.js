/**
 * @flow
 * @relayHash bf1815633cab1add04c05e083ad0b27d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FindMeRelayQueryRendererTestQueryVariables = {||};
export type FindMeRelayQueryRendererTestQueryResponse = {|
  +postsFeed: $ReadOnlyArray<{|
    +id: string
  |}>
|};
export type FindMeRelayQueryRendererTestQuery = {|
  variables: FindMeRelayQueryRendererTestQueryVariables,
  response: FindMeRelayQueryRendererTestQueryResponse,
|};
*/


/*
query FindMeRelayQueryRendererTestQuery {
  postsFeed {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "postsFeed",
    "storageKey": null,
    "args": null,
    "concreteType": "Post",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FindMeRelayQueryRendererTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "FindMeRelayQueryRendererTestQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "FindMeRelayQueryRendererTestQuery",
    "id": null,
    "text": "query FindMeRelayQueryRendererTestQuery {\n  postsFeed {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0e2fa517c5001ea82bbb5c6cc2ece10b';
module.exports = node;
