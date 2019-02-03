

//== Profile Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import {
  QUERY_CLIENT_PROFILE,
  QUERY_USER_PROFILE,
  QUERY_FRIENDS_PROFILE,
  QUERY_USERS_PROFILE,
  QUERY_ME_PROFILE
} from '../services/requests/profile'
import UserCard from '../components/Profile/UserCard'
import Header from '../components/ProfileHeader/ProfileHeader.js'
import FriendsList from '../components/Profile/FriendsList.js'
import '../components/Profile/profile.less'

//-- React Implementation ------------------------

export default class Profile extends Component {

  render() {
    return (
      <Fragment>
        <div className='profile_pageContainer'>
          <div className='profile_mainContainer'>
                  <div className='profile_userCardContainer'>

                  {/* #region UserCard component */}
                    <Query query={QUERY_ME_PROFILE} >
                    {({ loading: loadingUser, error, data }) => {
                      if (loadingUser) {
                        return <div>Loading</div>
                      }
                      if (error) {
                        return <div>I fucked up</div>
                      }
                      return (
                        <div>i made a query</div>
                      );
                    }}
                    </Query>
                  {/* #endregion UserCard component */}

                  </div>


          </div>
        </div>
      </Fragment>
    );

  }
}

// <UserCard user={me}/>
//
// <div className='profile_friendsContainer'>
//
// {/* #region Header component */}
//   <Query query={QUERY_USERS_PROFILE}>
//   {({ loading: loadingUsers, data: {users} }) => {
//     if (loadingUserId || loadingUsers) {
//       return <div>Loading</div>
//     }
//     return (
//       <Header userId={userId} users={users} logout={props.logout} />
//     );
//   }}
//   </Query>
// {/* #endregion Header component end */}
//
// {/* #region FriendsList component */}
//   <Query query={QUERY_FRIENDS_PROFILE} variables={{id: userId}}>
//   {({ loading: loadingFriends, data: {friends} }) => {
//     if (loadingUserId || loadingFriends) {
//       return <div>Loading</div>
//     }
//     return (
//       <FriendsList userId={userId} friends={friends} />
//     );
//   }}
//   </Query>
// {/* #endregion FriendsList component */}
// </div>
