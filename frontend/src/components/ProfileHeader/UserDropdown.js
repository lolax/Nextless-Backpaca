

//== Users Drop Down ===========================================================
/*
  Please add documentation detailing the purpose and use of this component.
  https://www.npmjs.com/package/next-routes 
*/

//-- Dependencies --------------------------------
import React from 'react'
import { Dropdown, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
// Need to figure out how to route in a semantic ui dropdown, hesitant to wrap whole dropdown in a <Link>
import { Mutation } from 'react-apollo';
import { MUTATION_FRIEND_PROFILE } from '../../services/requests/profile.js';
import '../Profile/profile.scss'

//-- React Implementation ------------------------

  //PROPS - passed from profile.js in pages:
  //userId - the current user that is logged in
  //users - users in the database which can be added as a friend
const UsersDropdown = ({ userId, users }) => {

  //filter users that are private and have names
  let filtered = users.filter(user => user.isPrivate === false && user.name !== null)

  //Takes users from props and maps over each user 
  const userList = filtered.map(user => {
    return {
      key: user.id,
      text: user.name,
      className: 'profile_dropList',
      content: 
      <Mutation mutation={MUTATION_FRIEND_PROFILE}>
        {setFriendId => (
          <Link 
            to={`/friends/${user.id}`}
            onClick={() => setFriendId({ variables: { id: user.id }})}>
            <Header>
              <Image 
                circular
                src={user.pictureUrl ? user.pictureUrl : 'https://jazzyacres.com/wp-content/uploads/2016/09/File-Sep-15-4-04-02-PM.jpeg'}
              />
              {user.name}
            </Header>
          </Link>
        )}
      </Mutation>
    };
  });

  return(
    // <Mutation mutation={MUTATION_FRIEND_PROFILE}>
    //   {setFriendId => (
        <Dropdown
        placeholder='Search for friends'
        floating
        search
        selectOnBlur={false}
        icon='search'
        options={userList}
        className='profile_userDropDown'
        // onChange={(e, data) => {
        //   setFriendId({ variables: { id: data.value }});
        // }}
        />
    //   )}
    // </Mutation>
  );
}
export default UsersDropdown;
