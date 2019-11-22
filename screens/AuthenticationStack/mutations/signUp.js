import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const signUpMutation = gql`
  mutation signUp($nome: String!,$cognome: String!,$email:String!,$password:String!) {
    signup(nome: $nome,cognome:$cognome,email:$email,password:$password) {
    token
    }
  }
`;

export function SignUp() {
  console.log("h");
  const [signUpMutation, { data }] = useMutation(signUpMutation);
  return signUpMutation({ variables: { nome, cognome, email, password } });
}