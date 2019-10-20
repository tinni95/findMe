/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type Fields_post$ref = any;
type PostCardText_post$ref = any;
type Views_post$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostCard_post$ref: FragmentReference;
declare export opaque type PostCard_post$fragmentType: PostCard_post$ref;
export type PostCard_post = {|
  +id: string,
  +$fragmentRefs: PostCardText_post$ref & Fields_post$ref & Views_post$ref,
  +$refType: PostCard_post$ref,
|};
export type PostCard_post$data = PostCard_post;
export type PostCard_post$key = {
  +$data?: PostCard_post$data,
  +$fragmentRefs: PostCard_post$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PostCard_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PostCardText_post",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Fields_post",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Views_post",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '57ea45931109768d41284c80b3d91eb0';
module.exports = node;
