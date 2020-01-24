import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';

import styles from './NoPlatesMessage.module.css';

export class NoPlatesMessage extends Component {
  render() {
    return (
      <Segment placeholder className={styles.noPlatesMessage}>
        <Header icon>
          <Icon name="grid layout" />
          There are no plates in this activity
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
