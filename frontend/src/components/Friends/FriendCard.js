import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo';
import { Card, Icon, Button } from 'semantic-ui-react';
import AddFriendButton from './AddFriendButton.js';
import DeleteFriendButton from './DeleteFriendButton.js';
import { Link } from 'react-router-dom';
import { 
  QUERY_USER_PROFILE,
  QUERY_FRIEND_PROFILE,
  MUTATION_VIEWFRIEND_PROFILE } from '../../services/requests/profile';

export default class FriendCard extends Component {
  constructor(props) {
    super(props)
  }

  //the current user that is logged in
  userId = this.props.currentUserId
  //list of friends of the logged in user
  friendList = this.props.friendsData

  
  friends = (id, name) => {   
    let isFriends = false
    this.friendList.forEach(friend => {
      if (friend.id === id) {
        isFriends = true
      }
    })

    if(isFriends) {
      return (
        <Fragment>
          <a>
            <Icon name='user'/>
            <DeleteFriendButton userId={this.userId} friendId={id} />
          </a>
          <Mutation mutation={MUTATION_VIEWFRIEND_PROFILE} variables={{id: id}}>
            {viewFriend => (
              <Link to='/travels' onClick={viewFriend}>
                <Button>{`View ${name}'s Travels`}</Button>
              </Link>
            )}
          </Mutation>
        </Fragment>
      )
    }

    if(!isFriends) {
      return (
        <a>
          <Icon name='user'/>
          <AddFriendButton userId={this.userId} friendId={id} />
        </a>
      )
    }
  }

  render() {
    return (
      <Query query={QUERY_FRIEND_PROFILE}>
        {({ loading: loadingFriendId, data: {friendId} }) => {
          return (
            <Query query={QUERY_USER_PROFILE} variables={ {id: friendId} }>
              {({ loading: loadingUser, data: {user} }) => {
                console.log(user)
                  if (loadingFriendId || loadingUser) {
                  return <div>loading...</div>
                }
                const visitCount = user.visits.length
                return (
                  <div>
                    <Card 
                    image='/static/alpaca.png'
                    header={user.name}
                    meta={visitCount === 1 ? `${visitCount} Visit` : `${visitCount} Visits`}
                    description={user.bio === null ? null : user.bio}
                    extra={this.friends(friendId, user.name)}
                    />
                  </div>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}
