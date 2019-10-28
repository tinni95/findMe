import { graphql } from "react-relay";
import commitMutation from "relay-commit-mutation-promise";

import environment from "../../shared/relay/environment";

export const SignUpMutation = graphql`
    mutation SignUpMutation(
        $email: String!
        $password: String!
        $name: String!
    ) {
        signup(
            email: $email
            password: $password
            name: $name
        ) {
          token
        }
    }
`;

export async function SignUp({
    email,
    password,
    name
}) {
    const response = commitMutation(environment, {
        mutation: SignUpMutation,
        variables: {
            email,
            password,
            name
        },
    }).then(response => {
        return response
    }).catch(error => {
        return error
    });
    return response;
}
