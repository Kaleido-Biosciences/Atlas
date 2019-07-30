import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Button, Message } from 'semantic-ui-react';

import { PopupButton } from './PopupButton';
import styles from './DeletePlateMapButton.module.css';

export class DeletePlateMapButton extends Component {
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
        buttonContent="Delete Plate"
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

DeletePlateMapButton.propTypes = {
  onConfirm: PropTypes.func,
};
