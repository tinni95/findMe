/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type LocationWithText_post$ref: FragmentReference;
declare export opaque type LocationWithText_post$fragmentType: LocationWithText_post$ref;
export type LocationWithText_post = {|
  +location: ?string,
  +$refType: LocationWithText_post$ref,
|};
export type LocationWithText_post$data = LocationWithText_post;
export type LocationWithText_post$key = {
  +$data?: LocationWithText_post$data,
  +$fragmentRefs: LocationWithText_post$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "LocationWithText_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "location",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'abb8554162021039fb5cd33c9d0d08ee';
module.exports = node;
