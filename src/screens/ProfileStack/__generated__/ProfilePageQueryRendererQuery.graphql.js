/**
 * @flow
 * @relayHash 3fc01dd5ed80b298a2931dbaeecb4fa2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProfilePageQueryRendererQueryVariables = {||};
export type ProfilePageQueryRendererQueryResponse = {|
  +currentUser: ?{|
    +email: string
  |}
|};
export type ProfilePageQueryRendererQuery = {|
  variables: ProfilePageQueryRendererQueryVariables,
  response: ProfilePageQueryRendererQueryResponse,
|};
*/

/*
query ProfilePageQueryRendererQuery {
  currentUser {
    email
    id
  }
}
*/

const node /*: ConcreteRequest*/ = (function () {
  var v0 = {
    kind: 'ScalarField',
    alias: null,
    name: 'email',
    args: null,
    storageKey: null,
  };
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'ProfilePageQueryRendererQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: [],
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'currentUser',
          storageKey: null,
          args: null,
          concreteType: 'User',
          plural: false,
          selections: [(v0 /*: any*/)],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'ProfilePageQueryRendererQuery',
      argumentDefinitions: [],
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'currentUser',
          storageKey: null,
          args: null,
          concreteType: 'User',
          plural: false,
          selections: [
            (v0 /*: any*/),
            {
              kind: 'ScalarField',
              alias: null,
              name: 'id',
              args: null,
              storageKey: null,
            },
          ],
        },
      ],
    },
    params: {
      operationKind: 'query',
      name: 'ProfilePageQueryRendererQuery',
      id: null,
      text: 'query ProfilePageQueryRendererQuery {\n  currentUser {\n    email\n    id\n  }\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'f49a915bdc1884ead44d313b1470ff6a';
module.exports = node;
