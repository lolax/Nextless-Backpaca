

//== Map Header ================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import NavigationDropdown from '../Navigation/NavigationDropdown';
import UserDropdown from './UserDropdown';
import './ProfileHeader.scss';

//-- React Implementation ------------------------
export default class MapHeader extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="Profile_profileHeader">
        {/* Logo in place of backpaca */}
        <div className='logo'>Backpaca</div>
        <UserDropdown userId={this.props.userId} users={this.props.users}/>
        <NavigationDropdown logout={this.props.logout}/>
      </div>
    );
  }
}
