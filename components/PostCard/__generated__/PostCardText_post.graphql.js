/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostCardText_post$ref: FragmentReference;
declare export opaque type PostCardText_post$fragmentType: PostCardText_post$ref;
export type PostCardText_post = {|
  +title: string,
  +startDate: any,
  +field: string,
  +location: ?string,
  +$refType: PostCardText_post$ref,
|};
export type PostCardText_post$data = PostCardText_post;
export type PostCardText_post$key = {
  +$data?: PostCardText_post$data,
  +$fragmentRefs: PostCardText_post$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PostCardText_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "startDate",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "field",
      "args": null,
      "storageKey": null
    },
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
(node/*: any*/).hash = '48c34dcc02e8d8dfd30fe7aaeda66778';
module.exports = node;
