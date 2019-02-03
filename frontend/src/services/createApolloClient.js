// ==================================================
// next-with-apollo -> withApollo: A HOC that allows
// the Apollo Client to work with Next.js (SSR)
// ==================================================
// import withApollo from 'next-with-apollo'
// import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, Observable } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { resolvers } from './resolvers'
// import { devURL, prodURL } from './config.js'

const defaults = {
  userId: 'cjqt5c95y00s40894zs7m6q4v',
  friendId: null,
  countryId: null,
  viewingFriend: false,
  isLoggedIn: false,
  modalOpen: false,
  viewBorders: false,
  scratchingComplete: false
}

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
})

// const request = async (operation) => {
//   const token = await localStorage.getItem('access_token');
//   operation.setContext({
//     headers: {
//       Authorization: token ? token : null
//     }
//   })
// }

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``
    }
  }
})
const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include'
});
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('access_token');
//   return {
//     ...headers,
//     Authorization: token ? `Bearer ${token}` : ``
//   }
// })

// const requestLink = new ApolloLink((operation, forward) => {
//   new Observable(observer => {
//     let handle;
//     Promise.resolve(operation)
//     .then(oper => request(oper))
//     .then(() => {
//       handle = forward(operation).subscribe({
//         next: observer.next.bind(observer),
//         error: observer.error.bind(observer),
//         complete: observer.complete.bind(observer),
//       });
//     })
//     .catch(observer.error.bind(observer));
//
//     return () => {
//       if (handle) {
//         handle.unsubscribe();
//       };
//     };
//   })
// });

const client = new ApolloClient({
  connectToDevtools: true,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }
      if (networkError) {
        console.log(networkError);
      }
    }),
    authLink.concat(httpLink),
    withClientState({
      defaults,
      resolvers,
      cache,
    }),
  ]),
  cache
});

export default client;
