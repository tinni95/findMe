/**
 * @flow
 * @relayHash 6586d9dc337ca642a14ff3057ab9a423
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LandingPageQueryRendererQueryVariables = {||};
export type LandingPageQueryRendererQueryResponse = {|
  +currentUser: ?{|
    +id: string
  |}
|};
export type LandingPageQueryRendererQuery = {|
  variables: LandingPageQueryRendererQueryVariables,
  response: LandingPageQueryRendererQueryResponse,
|};
*/


/*
query LandingPageQueryRendererQuery {
  currentUser {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "currentUser",
    "storageKey": null,
    "args": null,
    "concreteType": "User",
    "plural": false,
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
    "name": "LandingPageQueryRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "LandingPageQueryRendererQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "LandingPageQueryRendererQuery",
    "id": null,
    "text": "query LandingPageQueryRendererQuery {\n  currentUser {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '360a3fa4132ca697b982d1c82598adc7';
module.exports = node;
