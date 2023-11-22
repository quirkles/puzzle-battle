import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:3030/graphql',
    cache: new InMemoryCache(),
});

