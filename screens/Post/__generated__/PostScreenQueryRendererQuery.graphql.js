/**
 * @flow
 * @relayHash 0a3b78e0eba387b4d8a8f904080ace5e
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
    +location: ?string,
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
    location
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
  "name": "location",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "available",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "field",
  "args": null,
  "storageKey": null
},
v7 = {
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
              (v5/*: any*/),
              (v6/*: any*/)
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
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ]
          },
          (v7/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PostScreenQueryRendererQuery",
    "id": null,
    "text": "query PostScreenQueryRendererQuery(\n  $postId: ID!\n) {\n  singlePost(id: $postId) {\n    description\n    title\n    location\n    positions {\n      title\n      available\n      field\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6b84f0a7f356352daaeb81410324e8ef';
module.exports = node;
