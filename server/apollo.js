import { withApollo } from 'next-apollo';
import { ApolloLink, HttpLink } from 'apollo-boost';
import { InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client/core';
import { getToken } from "~/utils/manageLocalStorage";

const API_URI = `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`;

function createLink() {
    let token;

    const httpLink = new HttpLink({
        uri: API_URI,
        credentials: 'include',
    });

    const authLink = new ApolloLink((operation, forward) => {
        try {
            if (typeof window !== 'undefined') {
                token = getToken();
            }

            operation.setContext(({headers = {}}) => (token ? {
                headers: {
                    ...headers,
                    authorization: `Bearer ${token}`
                },
            } : {
                headers
            }));

            return forward(operation);
        } catch (error) {
            console.error('Error in authLink:', error);
            throw error;
        }
    });

    return ApolloLink.from([authLink, httpLink]);
}

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createLink()
});

export default withApollo(apolloClient);