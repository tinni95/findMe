/**
 * @flow
 * @relayHash 274540aeedfdf14cb94872c37eea5963
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExploreQueryRendererQueryVariables = {||};
export type ExploreQueryRendererQueryResponse = {|
  +posts: $ReadOnlyArray<?{|
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
    "text": "query ExploreQueryRendererQuery {\n  posts {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '735ae7adf48af81cf2748839d2357e61';
module.exports = node;
