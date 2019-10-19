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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '6b60b590067246dc5599dcb5929e51d4';
module.exports = node;
