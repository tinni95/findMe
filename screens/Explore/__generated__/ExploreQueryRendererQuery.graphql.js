/**
 * @flow
 * @relayHash 6edf128f74203f94e895e337a8018258
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Explore_post$ref = any;
type PostCard_post$ref = any;
export type ExploreQueryRendererQueryVariables = {||};
export type ExploreQueryRendererQueryResponse = {|
  +postsFeed: $ReadOnlyArray<{|
    +$fragmentRefs: Explore_post$ref & PostCard_post$ref
  |}>
|};
export type ExploreQueryRendererQuery = {|
  variables: ExploreQueryRendererQueryVariables,
  response: ExploreQueryRendererQueryResponse,
|};
*/


/*
query ExploreQueryRendererQuery {
  postsFeed {
    ...Explore_post
    ...PostCard_post
    id
  }
}

fragment Explore_post on Post {
  title
  description
}

fragment PostCard_post on Post {
  ...PostCardText_post
  ...Fields_post
  ...Views_post
  ...PostCardPublisher_post
}

fragment PostCardText_post on Post {
  title
  description
}

fragment Fields_post on Post {
  positions {
    available
    field
    id
  }
}

fragment Views_post on Post {
  views
}

fragment PostCardPublisher_post on Post {
  positions {
    available
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ExploreQueryRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "postsFeed",
        "storageKey": null,
        "args": null,
        "concreteType": "Post",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Explore_post",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "PostCard_post",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ExploreQueryRendererQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "postsFeed",
        "storageKey": null,
        "args": null,
        "concreteType": "Post",
        "plural": true,
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
          },
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
              },
              (v0/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "views",
            "args": null,
            "storageKey": null
          },
          (v0/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ExploreQueryRendererQuery",
    "id": null,
    "text": "query ExploreQueryRendererQuery {\n  postsFeed {\n    ...Explore_post\n    ...PostCard_post\n    id\n  }\n}\n\nfragment Explore_post on Post {\n  title\n  description\n}\n\nfragment PostCard_post on Post {\n  ...PostCardText_post\n  ...Fields_post\n  ...Views_post\n  ...PostCardPublisher_post\n}\n\nfragment PostCardText_post on Post {\n  title\n  description\n}\n\nfragment Fields_post on Post {\n  positions {\n    available\n    field\n    id\n  }\n}\n\nfragment Views_post on Post {\n  views\n}\n\nfragment PostCardPublisher_post on Post {\n  positions {\n    available\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '50f237bcb0deef16aa7b8f17fb9836f5';
module.exports = node;
