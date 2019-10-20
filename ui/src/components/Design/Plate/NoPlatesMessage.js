import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';

export class NoPlatesMessage extends Component {
  render() {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="grid layout" />
          There are no plates in this experiment
        </Header>
        <Button primary onClick={this.props.onAddClick}>
          Add a Plate
        </Button>
      </Segment>
    );
  }
}

NoPlatesMessage.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
