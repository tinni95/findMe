/**
 * @flow
 * @relayHash b10d39d0552207b570ef878642807cbf
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PostScreenQueryRendererQueryVariables = {|
  postId: string
|};
export type PostScreenQueryRendererQueryResponse = {|
  +singlePost: {|
    +description: string,
    +title: string,
    +comune: string,
    +regione: string,
    +positions: ?$ReadOnlyArray<{|
      +title: string,
      +available: number,
      +field: string,
    |}>,
  |}
|};
export type PostScreenQueryRendererQuery = {|
  variables: PostScreenQueryRendererQueryVariables,
  response: PostScreenQueryRendererQueryResponse,
|};
*/


/*
query PostScreenQueryRendererQuery(
  $postId: ID!
) {
  singlePost(id: $postId) {
    description
    title
    comune
    regione
    positions {
      title
      available
      field
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "postId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "postId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "comune",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "regione",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "available",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "field",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PostScreenQueryRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singlePost",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "positions",
            "storageKey": null,
            "args": null,
            "concreteType": "Position",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PostScreenQueryRendererQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singlePost",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "positions",
            "storageKey": null,
            "args": null,
            "concreteType": "Position",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ]
          },
          (v8/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PostScreenQueryRendererQuery",
    "id": null,
    "text": "query PostScreenQueryRendererQuery(\n  $postId: ID!\n) {\n  singlePost(id: $postId) {\n    description\n    title\n    comune\n    regione\n    positions {\n      title\n      available\n      field\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fb718d18dba2a1e44cfbd2f243092762';
module.exports = node;
