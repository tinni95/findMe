/**
 * @flow
 * @relayHash c61c2eacf63b79502f8cf3cc6510cc1d
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +posts: $ReadOnlyArray<?{|
    +id: string
  |}>
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/

/*
query AppQuery {
  posts {
    id
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
    {
      kind: "LinkedField",
      alias: null,
      name: "posts",
      storageKey: null,
      args: null,
      concreteType: "Post",
      plural: true,
      selections: [
        {
          kind: "ScalarField",
          alias: null,
          name: "id",
          args: null,
          storageKey: null
        }
      ]
    }
  ];
  return {
    kind: "Request",
    fragment: {
      kind: "Fragment",
      name: "AppQuery",
      type: "Query",
      metadata: null,
      argumentDefinitions: [],
      selections: (v0 /*: any*/)
    },
    operation: {
      kind: "Operation",
      name: "AppQuery",
      argumentDefinitions: [],
      selections: (v0 /*: any*/)
    },
    params: {
      operationKind: "query",
      name: "AppQuery",
      id: null,
      text: "query AppQuery {\n  posts {\n    id\n  }\n}\n",
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '7bad0e0c9e866b0692eb2b7c079af706';
module.exports = node;
