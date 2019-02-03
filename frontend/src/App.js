import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import client from './services/createApolloClient.js';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, Observable } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { resolvers } from './services/resolvers';
// import Auth from './services/auth/auth';
// import { devURL, prodURL } from './config.js'
import { Route } from 'react-router-dom';
import './sass/index.scss';
import Landing from './pages/landing';
import Friends from './pages/friends';
import Profile from './pages/profile';
import Travels from './pages/travels';
import Auth from './services/auth/auth';
import Callback from './components/Callback/Callback';


// const defaults = {
//   userId: 'cjqt5c95y00s40894zs7m6q4v',
//   friendId: null,
//   countryId: null,
//   viewingFriend: false,
//   isLoggedIn: false,
//   modalOpen: false,
//   viewBorders: false,
//   scratchingComplete: false
// }
//
// const cache = new InMemoryCache({
//   dataIdFromObject: o => o.id
// })
//
// const request = async (operation) => {
//   const token = await localStorage.getItem('access_token');
//   operation.setContext({
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ``
//     }
//   })
// }
// const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('access_token');
//   return {
//     ...headers,
//     Authorization: token ? `Bearer ${token}` : ``
//   }
// })
//
// // const requestLink = new ApolloLink((operation, forward) => {
// //   new Observable(observer => {
// //     let handle;
// //     Promise.resolve(operation)
// //     .then(oper => request(oper))
// //     .then(() => {
// //       handle = forward(operation).subscribe({
// //         next: observer.next.bind(observer),
// //         error: observer.error.bind(observer),
// //         complete: observer.complete.bind(observer),
// //       });
// //     })
// //     .catch(observer.error.bind(observer));
// //
// //     return () => {
// //       if (handle) {
// //         handle.unsubscribe();
// //       };
// //     };
// //   })
// // });
//
// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors) {
//         console.log(graphQLErrors);
//       }
//       if (networkError) {
//         console.log(networkError);
//       }
//     }),
//     httpLink,
//     authLink,
//     withClientState({
//       defaults,
//       resolvers,
//       cache,
//     }),
//   ]),
//   cache
// });

const auth = new Auth((result) => console.log('auth result', result), client)

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

class App extends Component {
  componentDidMount() {
    console.log('app props',this.props);
    // if (auth.isAuthenticated()) {
    //   history.push('/profile')
    // }
  }
  render() {
    // if (!auth.isAuthenticated()) {
    //   return (
    //
    //   )
    // }
    return (
      <>
        <Route exact path='/' render={(props) => <Landing {...props}  login={auth.login} />} />
        <Route path='/friends' render={(props) => <Friends {...props} logout={auth.logout}/>} />
        <Route path='/profile' render={(props) => <Profile {...props} logout={auth.logout}/>} />
        <Route path='/travels' render={(props) => <Travels {...props} logout={auth.logout}/>} />
        <Route path='/callback' render={(props) => {
          handleAuthentication(props)
          return <Callback{...props} />
        }} />
      </>
    );
  }
}

export default App;
