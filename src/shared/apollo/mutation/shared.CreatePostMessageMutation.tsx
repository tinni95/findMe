import gql from 'graphql-tag';

const CREATEPOSTMESSAGE_MUTATION = gql`
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

export default CREATEPOSTMESSAGE_MUTATION;