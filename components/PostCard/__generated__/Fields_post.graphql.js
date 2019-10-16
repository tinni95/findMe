/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Fields_post$ref: FragmentReference;
declare export opaque type Fields_post$fragmentType: Fields_post$ref;
export type Fields_post = {|
  +positions: ?$ReadOnlyArray<{|
    +available: number,
    +field: string,
  |}>,
  +$refType: Fields_post$ref,
|};
export type Fields_post$data = Fields_post;
export type Fields_post$key = {
  +$data?: Fields_post$data,
  +$fragmentRefs: Fields_post$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Fields_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "positions",
      "storageKey": null,
      "args": null,
      "concreteType": "Position",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "available",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "field",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'da9fa64d698411cfed8a6d4d9dcf255d';
module.exports = node;
