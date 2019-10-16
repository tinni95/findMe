/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Views_post$ref: FragmentReference;
declare export opaque type Views_post$fragmentType: Views_post$ref;
export type Views_post = {|
  +views: number,
  +$refType: Views_post$ref,
|};
export type Views_post$data = Views_post;
export type Views_post$key = {
  +$data?: Views_post$data,
  +$fragmentRefs: Views_post$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Views_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "views",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '2c794ffe3cc5c51b8562f8dbe2468748';
module.exports = node;
