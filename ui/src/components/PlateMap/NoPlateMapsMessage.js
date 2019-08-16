import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';

export class NoPlateMapsMessage extends Component {
  render() {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="grid layout" />
          There are no plate maps in this experiment
        </Header>
        <Button primary onClick={this.props.onAddClick}>
          Add a Plate Map
        </Button>
      </Segment>
    );
  }
}

NoPlateMapsMessage.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
