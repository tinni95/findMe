import { graphql } from 'react-relay';
import commitMutation from 'relay-commit-mutation-promise';

import environment from '../../shared/relay/environment';

export const LoginMutation = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export async function Login({ email, password }) {
  const response = commitMutation(environment, {
    mutation: LoginMutation,
    variables: {
      email,
      password
    }
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
  return response;
}
