import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Button, Message } from 'semantic-ui-react';

import styles from './DeletePlateMapButton.module.css';

export class DeletePlateMapButton extends Component {
  state = {
    popupOpen: false,
  };
  handlePopupOpen = () => {
    this.setState({ popupOpen: true });
  };
  handlePopupClose = () => {
    this.setState({ popupOpen: false });
  };
  handleDeleteClick = () => {
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick();
    }
    this.handlePopupClose();
  };
  render() {
    return (
      <Popup
        trigger={<Button icon="trash" content="Delete Plate" />}
        on="click"
        position="bottom left"
        open={this.state.popupOpen}
        onOpen={this.handlePopupOpen}
        onClose={this.handlePopupClose}
      >
        <div className={styles.popupBody}>
          <Message size="tiny" className={styles.message}>
            Are you sure? The current plate will be permanently deleted.
          </Message>
          <Button onClick={this.handleDeleteClick} color="red">
            Yes, delete plate
          </Button>
        </div>
      </Popup>
    );
  }
}

DeletePlateMapButton.propTypes = {
  onDeleteClick: PropTypes.func,
};
