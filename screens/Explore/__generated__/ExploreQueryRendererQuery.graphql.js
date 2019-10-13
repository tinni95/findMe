/**
 * @flow
 * @relayHash b05b40db6786756eb54d0b978518a284
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExploreQueryRendererQueryVariables = {||};
export type ExploreQueryRendererQueryResponse = {|
  +postsFeed: $ReadOnlyArray<{|
    +id: string
  |}>
|};
export type ExploreQueryRendererQuery = {|
  variables: ExploreQueryRendererQueryVariables,
  response: ExploreQueryRendererQueryResponse,
|};
*/


/*
query ExploreQueryRendererQuery {
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
    "name": "ExploreQueryRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ExploreQueryRendererQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ExploreQueryRendererQuery",
    "id": null,
    "text": "query ExploreQueryRendererQuery {\n  postsFeed {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '535081e7660298545c0783fa25a8fd05';
module.exports = node;
