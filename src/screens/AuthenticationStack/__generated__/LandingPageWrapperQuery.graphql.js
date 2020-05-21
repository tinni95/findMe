/**
 * @flow
 * @relayHash f1804a4211c21c8d65bc1f8b81894fda
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LandingPageWrapperQueryVariables = {||};
export type LandingPageWrapperQueryResponse = {|
  +currentUser: ?{|
    +email: string
  |}
|};
export type LandingPageWrapperQuery = {|
  variables: LandingPageWrapperQueryVariables,
  response: LandingPageWrapperQueryResponse,
|};
*/

/*
query LandingPageWrapperQuery {
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
      name: 'LandingPageWrapperQuery',
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
      name: 'LandingPageWrapperQuery',
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
      name: 'LandingPageWrapperQuery',
      id: null,
      text: 'query LandingPageWrapperQuery {\n  currentUser {\n    email\n    id\n  }\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = '6c83ab755bd87dd29467601ae9a54479';
module.exports = node;
