

//== Country Modal =============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import FriendsVisits from './FriendsVisits';
import Note from './Note';
//import LevelOfVisit from './LevelOfVisit';
import Header from './Header';
//import Scratcher from './Scratcher';
import { QUERY_CLIENT_MODAL } from '../../services/requests/modal';
import './countryModal.less'
import ScratchHandler from './ScratchHandler.js';
import ClearVisitButton from './ClearVisitButton';

//-- React Implementation ------------------------
export default class CountryModal extends Component {
  render() {
    return (
      <Query query={QUERY_CLIENT_MODAL}>
      {({ loading, data }) => {
        let displayId, disabled
        if (data.viewingFriend) {
          displayId = data.friendId
          disabled = true;
        }
        if (!data.viewingFriend) {
          displayId = data.userId
          disabled = false
        }
        return (
          <div className='modal'>
            <Card.Content>
              <Header id={data.countryId} />
              <ScratchHandler
                countryId={data.countryId}
                displayId={displayId}
                disabled={disabled}
              />
              <Note
                countryId={data.countryId}
                displayId={displayId}
                disabled={disabled}
              />
              <FriendsVisits
                id={data.countryId}
                displayId={displayId}
              />
              <ClearVisitButton 
                countryId={data.countryId}
                userId={data.userId}
                friendId={data.friendId}
                disabled={disabled}
              />
            </Card.Content>
          </div>
        );
        /* Legacy code. Delete once slider component has replaced buttons, and
          all merge conflicts have been resolved.
        return (
          <Card>
            <Card.Content>
              <Header id={data.countryId} />
              <Scratcher countryId={data.countryId} displayId={displayId} disabled={disabled} />
              <LevelOfVisit countryId={data.countryId} displayId={displayId} disabled={disabled} />
              <Note countryId={data.countryId} displayId={displayId} disabled={disabled} />
              <FriendsVisits id={data.countryId} displayId={displayId} />
            </Card.Content>
          </Card>
        )*/
      }}
      </Query>
    );
  }
}


//== Diagnostic Info ===========================================================

//example set of console.logs for displayId is a friendId:
// {userId: "cjqt5c95y00s40894zs7m6q4v", viewingFriend: true, friendId: "cjqt5d9ox00sl0894ur6k9qza", viewBorders: false}
// CountryModal.js:23 friend in play cjqt5d9ox00sl0894ur6k9qza
// CountryModal.js:30 id just before return cjqt5d9ox00sl0894ur6k9qza
// CMnote.js:14 props {countryId: "cjqy9e28y00i20840rwy5l1ti", displayId: "cjqt5d9ox00sl0894ur6k9qza", disabled: true}
// CMnote.js:24 user undefined
// CMnote.js:33 undefined

//same console.logs when it is a userid:
// {userId: "cjqt5c95y00s40894zs7m6q4v", viewingFriend: false, friendId: null, viewBorders: false}
// CountryModal.js:26 viewing me
// CountryModal.js:30 id just before return cjqt5c95y00s40894zs7m6q4v
// CMlevelOfVisit.js:26 in the buttons {visits: Array(5), __typename: "User"}
// CMlevelOfVisit.js:35 [{…}]
// UpdateButtons.js:14 update buttons
// CMnote.js:14 props {countryId: "cjqy9e28y00i20840rwy5l1ti", displayId: "cjqt5c95y00s40894zs7m6q4v", disabled: false}
// CMnote.js:24 user {visits: Array(5), __typename: "User"}
// CMnote.js:33 [{…}]
// CMnote.js:45 Excellend christmas markets and do NOT miss the paprika sausage.
