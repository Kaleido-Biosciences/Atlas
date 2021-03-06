import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Button } from 'semantic-ui-react';

import styles from './DeleteGridConfirmation.module.css';

export class DeleteGridConfirmation extends Component {
  handleClick = () => {
    if (this.props.onConfirmClick) {
      this.props.onConfirmClick();
    }
  };
  render() {
    return (
      <div className={styles.deleteGridConfirmation}>
        <Message size="tiny" className={styles.message}>
          Are you sure? The current container will be permanently deleted. This
          action cannot be undone.
        </Message>
        <Button onClick={this.handleClick} color="red">
          Yes, delete container
        </Button>
      </div>
    );
  }
}

DeleteGridConfirmation.propTypes = {
  onConfirmClick: PropTypes.func,
};
