import React from 'react';
import FriendCard from '../components/Friends/FriendCard.js'
import Header from '../components/ProfileHeader/ProfileHeader.js'
import {
  QUERY_CLIENT_PROFILE,
  QUERY_FRIENDS_PROFILE,
  QUERY_USERS_PROFILE } from '../services/requests/profile'
import { Query } from 'react-apollo';

const Friends = (props) => (
  <Query query={QUERY_CLIENT_PROFILE}>
  {({ loading: loadingUserId, data: { userId } }) => {
    if(loadingUserId) {
      return <div>Loading...</div>
    }
    return (
      <Query query={QUERY_FRIENDS_PROFILE} variables={{id: userId}}>
      {({ loading, data: friends }) => {
        if(loading) {
          return <div>Loading...</div>
        }
        return (
          <Query query={QUERY_USERS_PROFILE}>
          {({ loading: loadingUsers, data: {users} }) => {
            if (loadingUserId || loadingUsers) {
              return <div>Loading</div>
            }
            return (
              <div>
                <Header userId={userId} users={users} logout={props.logout}/>
                <FriendCard currentUserId={userId} friendsData={friends.friends} />
              </div>
            );
          }}
          </Query>
        )
      }}
      </Query>
    )
  }}
  </Query>
)

export default Friends
