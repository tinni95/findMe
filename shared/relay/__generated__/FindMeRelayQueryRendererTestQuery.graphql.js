/**
 * @flow
 * @relayHash fadf44750928a8a774e76dea982b5e97
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FindMeRelayQueryRendererTestQueryVariables = {||};
export type FindMeRelayQueryRendererTestQueryResponse = {|
  +posts: $ReadOnlyArray<?{|
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
  posts {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "posts",
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
    "text": "query FindMeRelayQueryRendererTestQuery {\n  posts {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8591f19273da72a70c33b808ade72bc0';
module.exports = node;
