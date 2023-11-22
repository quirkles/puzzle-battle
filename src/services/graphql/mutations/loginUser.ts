import { gql } from '../../../__generated__';

export const LOGIN_USER = gql(/* GraphQL */ `
  mutation CreateUser($userData: CreateUserArgs!) {
    createUser(userData: $userData) {
      username
      lichessId
      lichessUsername
      lichessPuzzleRating
      id
    }
  }
`);
