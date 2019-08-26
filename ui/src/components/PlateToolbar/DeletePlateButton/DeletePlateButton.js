import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Message } from 'semantic-ui-react';

import { PopupButton } from '../PopupButton';
import styles from './DeletePlateButton.module.css';

export class DeletePlateButton extends Component {
  popupRef = React.createRef();
  handleDeleteClick = () => {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
    this.popupRef.current.handlePopupClose();
  };
  render() {
    return (
      <PopupButton
        buttonIcon="trash"
        buttonContent="Delete plate"
        ref={this.popupRef}
      >
        <div className={styles.popupBody}>
          <Message size="tiny" className={styles.message}>
            Are you sure? The current plate will be permanently deleted.
          </Message>
          <Button onClick={this.handleDeleteClick} color="red">
            Yes, delete plate
          </Button>
        </div>
      </PopupButton>
    );
  }
}

DeletePlateButton.propTypes = {
  onConfirm: PropTypes.func,
};
