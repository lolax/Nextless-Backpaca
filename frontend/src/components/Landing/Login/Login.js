

//== Login =====================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import '../landing.scss';
// import Auth from '../../services/Authentication/auth/auth';

//-- Project Constants ---------------------------

//-- React Implementation ------------------------
export default class Login extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='login_loginButton'>
          <Button color="twitter" className='login' onClick={() => this.props.login()}>
           Login or SignUp
          </Button>
      </div>
    );
  }
}
