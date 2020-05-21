import gql from 'graphql-tag';

const UNSEEAPPLICATIONCHAT_MUTATION = gql`
  mutation unseeApplicationChatChatMutation($id: ID!, $pubRead: Boolean, $subRead: Boolean) {
    UnseeApplication(id: $id, pubRead: $pubRead, subRead: $subRead) {
      id
      subRead
      pubRead
    }
  }
`;

export default UNSEEAPPLICATIONCHAT_MUTATION;