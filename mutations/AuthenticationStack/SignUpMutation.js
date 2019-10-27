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
    name,
    onCompleted,
    onError
}) {
    const { signup } = await commitMutation(environment, {
        mutation: SignUpMutation,
        variables: {
            email,
            password,
            name
        },
        onCompleted,
        onError
    });
    return signup;
}
