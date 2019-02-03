

//== Navigation Dropdown =======================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import './nav.scss'

//-- Project Constants ---------------------------


//-- React Implementation ------------------------
export default class NavigationDropdown extends Component {
  render() {
    return (
      <Dropdown floating text="pages" className= 'Nav_dropDown'>
        <Dropdown.Menu className='Nav_menu'>
          <Link to="/travels">
            <Dropdown.Item text="Travels" icon="plane" className='Nav_item'/>
          </Link>
          <Link to="/profile">
            <Dropdown.Item text="Profile" icon="user" href="/profile" className='Nav_item' />
          </Link>
          <Dropdown.Item text="Logout" icon="sign out" onClick={() => this.props.logout()} className='Nav_item' />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
