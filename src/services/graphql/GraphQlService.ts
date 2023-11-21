import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'localhost:3030',
    cache: new InMemoryCache(),
});

