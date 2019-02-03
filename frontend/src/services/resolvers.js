
import gql from 'graphql-tag';
import {  QUERY_CLIENT_MODAL } from './requests/modal'
import {  QUERY_CLIENT_PROFILE } from './requests/profile'
import {  QUERY_VIEWBORDERS_HEADER } from './requests/header'

// export const typeDefs = gql`
//   extend type Query {
//     userId: String
//     viewingFriend: Boolean
//     friendId: String
//     isLoggedIn: Boolean
//   }
// `

export const resolvers = {
  Mutation: {
    viewFriend: (_obj, { id }, {cache}) => {
      const query = QUERY_CLIENT_PROFILE;
      const currentState = cache.readQuery({ query });
      let data = {};
      if (currentState.userId === id) {
        data = {
          viewingFriend: false,
          friendId: null,
        }
      } else {
        data = {
          viewingFriend: true,
          friendId: id
        };
      }
      cache.writeData({ data });
      return data;
    },
    openModal: (_obj, { id }, {cache}) => {
      const data = {
        modalOpen: true,
        countryId: id
      }
      cache.writeData({ data });
      const query = QUERY_CLIENT_MODAL;
      const currentState = cache.readQuery({ query });
      console.log('openModal', currentState)
      return data;
    },
    closeModal: (_obj, args, {cache}) => {
      const data = {
        modalOpen: false,
        countryId: null,
      }
      cache.writeData({ data });
      const query = QUERY_CLIENT_MODAL;
      const currentState = cache.readQuery({ query });
      console.log('closeModal', currentState)
      return data;
    },
    toggleBorders: (_obj, args, {cache}) => {
      const query = QUERY_VIEWBORDERS_HEADER;
      const currentState = cache.readQuery({ query });
      console.log('currentCheck', currentState)
      const data = {
        viewBorders: !currentState.viewBorders
      }
      cache.writeData({data});
      const query2 = QUERY_VIEWBORDERS_HEADER;
      const newState = cache.readQuery({ query });
      console.log('newCheck', newState);
    },
    scratchingComplete: (_obj, args, {cache}) => {
      const data = {
        scratchingComplete: true
      }
      cache.writeData({ data });
      return data;
    },
    scratchingReset: (_obj, args, {cache}) => {
      const data = {
        scratchingComplete: false
      }
      cache.writeData({ data });
      return data;
    },
    setFriendId: (_obj, { id }, {cache}) => {
      const data = {
        friendId: id
      }
      cache.writeData({ data });
    }
  }
}
