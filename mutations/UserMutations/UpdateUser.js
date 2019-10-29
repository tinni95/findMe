import { graphql } from 'react-relay';
import commitMutation from 'relay-commit-mutation-promise';

import environment from '../../shared/relay/environment';

export const UpdateUserMutation = graphql`
  mutation UpdateUserMutation($picture: Upload) {
    updateUser(picture: $picture) {
      id
    }
  }
`;

export async function uploadImage({ picture, email, }) {
  const response = commitMutation(environment, {
    mutation: UpdateUserMutation,
    varibales: {
      picture
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
  return response;
}
