import { graphql } from "react-relay";
import commitMutation from "relay-commit-mutation-promise";

import environment from "../../shared/relay/environment";

export const LoginMutation = graphql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
          token
        }
    }
`;

export async function Login({
    email,
    password,
    onError,
    onSuccess
}) {
    const { Login } = await commitMutation(environment, {
        mutation: LoginMutation,
        variables: {
            email,
            password,
        },
        onError,
        onSuccess
    });
    Login;
}
