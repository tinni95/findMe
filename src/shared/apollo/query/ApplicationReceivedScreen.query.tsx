import gql from "graphql-tag";

export const APPLICATIONS_FOR_POST = gql`
  query applicationsForPosition($postId: ID!) {
    applicationsForPosition(postId: $postId) {
      pubRead
      id
      to {
        nome
        pictureUrl
        id
      }
      messages{
        text
      }
      from {
        nome
        cognome
        comune
        regione
        id
        pictureUrl
      }
      post {
        closedFor {
        id
      }
        opened
        id
        titolo
      }
    }
  }
`;