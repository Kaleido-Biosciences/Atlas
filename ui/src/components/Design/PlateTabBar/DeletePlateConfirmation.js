import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Button } from 'semantic-ui-react';

import styles from './DeletePlateConfirmation.module.css';

export class DeletePlateConfirmation extends Component {
  handleClick = () => {
    if (this.props.onConfirmClick) {
      this.props.onConfirmClick();
    }
  };
  render() {
    return (
      <div className={styles.deletePlateConfirmation}>
        <Message size="tiny" className={styles.message}>
          Are you sure? The current plate will be permanently deleted. This
          action cannot be undone.
        </Message>
        <Button onClick={this.handleClick} color="red">
          Yes, delete plate
        </Button>
      </div>
    );
  }
}

DeletePlateConfirmation.propTypes = {
  onConfirmClick: PropTypes.func,
};
