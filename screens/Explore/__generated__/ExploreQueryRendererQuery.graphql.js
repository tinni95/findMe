/**
 * @flow
 * @relayHash bdaaaec88b327c242177283cd61fce29
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExploreQueryRendererQueryVariables = {||};
export type ExploreQueryRendererQueryResponse = {|
  +postsFeed: $ReadOnlyArray<{|
    +id: string,
    +title: string,
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
    title
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "title",
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
    "text": "query ExploreQueryRendererQuery {\n  postsFeed {\n    id\n    title\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c4493c3309465196cbf7e836842f6070';
module.exports = node;
