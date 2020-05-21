import gql from 'graphql-tag';

export const CLOSE_POSITION_FOR_APPLICATION = gql`
  mutation closePositionForApplication($postId: ID!, $applicationId: ID!) {
    closePositionForApplication(postId: $postId, applicationId: $applicationId) {
      id
    }
  }
`;

export const UNSEEAPPLICATIONCHAT_MUTATION = gql`
  mutation unseeApplicationChatChatMutation($id: ID!, $pubRead: Boolean, $subRead: Boolean) {
    UnseeApplication(id: $id, pubRead: $pubRead, subRead: $subRead) {
      id
      subRead
      pubRead
    }
  }
`;

export const CREATEPOSTMESSAGE_MUTATION = gql`
  mutation createPostMessage($applicationId: ID!, $text: String!, $subId: ID!) {
    createPostMessage(applicationId: $applicationId, text: $text, subId: $subId) {
      application {
        pubRead
        from {
          id
        }
        to {
          id
          nome
        }
        post {
          titolo
        }
        id
      }
    }
  }
`;
