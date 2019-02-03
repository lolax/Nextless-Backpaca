import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import createApolloClient from './services/createApolloClient.js';
import { Route } from 'react-router-dom';
import './less/index.less';
import Landing from './pages/landing';
import Friends from './pages/friends';
import Profile from './pages/profile';
import Travels from './pages/travels'; 

class App extends Component {
  render() {
    return (
      <ApolloProvider client={this.props.apollo}>
        <Route path='/' component={Landing} />
        <Route path='/friends' component={Friends} />
        <Route path='/profile' component={Profile} />
        <Route path='/travels' component={Travels} />
      </ApolloProvider>
    );
  }
}

export default createApolloClient(App);
