/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostCardPublisher_post$ref: FragmentReference;
declare export opaque type PostCardPublisher_post$fragmentType: PostCardPublisher_post$ref;
export type PostCardPublisher_post = {|
  +positions: ?$ReadOnlyArray<{|
    +available: number
  |}>,
  +$refType: PostCardPublisher_post$ref,
|};
export type PostCardPublisher_post$data = PostCardPublisher_post;
export type PostCardPublisher_post$key = {
  +$data?: PostCardPublisher_post$data,
  +$fragmentRefs: PostCardPublisher_post$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PostCardPublisher_post",
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'c69400f8916b421f989e7278fa81055b';
module.exports = node;
