import { graphql } from "react-relay";
import commitMutation from "relay-commit-mutation-promise";

import environment from "../../shared/relay/environment";

export const SignUpMutation = graphql`
    mutation SignUpMutation(
        $email: String!
        $password: String!
        $nome: String!
        $cognome: String!
    ) {
        signup(
            email: $email
            password: $password
            nome: $nome
            cognome: $cognome
        ) {
          token
        }
    }
`;

export async function SignUp({
    email,
    password,
    nome,
    cognome
}) {
    const response = commitMutation(environment, {
        mutation: SignUpMutation,
        variables: {
            email,
            password,
            nome,
            cognome
        },
    }).then(response => {
        return response
    }).catch(error => {
        return error
    });
    return response;
}
