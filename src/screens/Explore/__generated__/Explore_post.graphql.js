/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Explore_post$ref: FragmentReference;
declare export opaque type Explore_post$fragmentType: Explore_post$ref;
export type Explore_post = {|
  +title: string,
  +description: string,
  +$refType: Explore_post$ref,
|};
export type Explore_post$data = Explore_post;
export type Explore_post$key = {
  +$data?: Explore_post$data,
  +$fragmentRefs: Explore_post$ref,
};
*/

const node /*: ReaderFragment*/ = {
  kind: 'Fragment',
  name: 'Explore_post',
  type: 'Post',
  metadata: null,
  argumentDefinitions: [],
  selections: [
    {
      kind: 'ScalarField',
      alias: null,
      name: 'title',
      args: null,
      storageKey: null,
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: 'description',
      args: null,
      storageKey: null,
    },
  ],
};
// prettier-ignore
(node/*: any*/).hash = '9fa96f8934eae8806065bbe53e7d38e3';
module.exports = node;
