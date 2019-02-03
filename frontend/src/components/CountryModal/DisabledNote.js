

//== Disabled Note =============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
import { Label } from 'semantic-ui-react';

//-- React Component Implementation --------------
export default class UpdateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
    };
  }
  componentDidMount() {
    if (this.props.note) {
      this.setState({
        note: this.props.note,
      });
    }
  }
  render() {
    return (
      <Fragment>
        <form>
          <input
          disabled
          type='textarea'
          name='note'
          value={this.state.note}
          />
          {!this.props.disabled &&
            <Label disabled>You must select a visit level above to create a note</Label>
          }
        </form>
      </Fragment>
    );
  }
}
