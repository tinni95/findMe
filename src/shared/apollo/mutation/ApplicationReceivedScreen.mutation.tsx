import gql from 'graphql-tag';

export const CLOSE_POSITION_FOR_APPLICATION = gql`
  mutation closePositionForApplication($postId: ID!, $applicationId: ID!) {
    closePositionForApplication(postId: $postId, applicationId: $applicationId) {
      id
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

