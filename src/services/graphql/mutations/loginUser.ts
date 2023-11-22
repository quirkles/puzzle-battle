import {gql} from "@apollo/client";

export const LOGIN_USER = gql`mutation CreateUser($userData: CreateUserArgs!) {
    createUser  (userData: $userData){
        username,
        lichessId,
        lichessUsername,
        lichessPuzzleRating,
        id
    }
}`
