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
  +description: string,
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
      "name": "description",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '4e3e9a3d758a61caa7b42f31e0d555d5';
module.exports = node;
