import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Button, Icon } from 'semantic-ui-react';

import { PopupButton } from 'AtlasUI/components';
import styles from './MarkAsCompletedButton.module.css';

export class MarkAsCompletedButton extends Component {
  popupRef = React.createRef();
  handleClick = () => {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
    this.popupRef.current.handlePopupClose();
  };
  render() {
    const { allGridBarcodesSet } = this.props;
    return (
      <PopupButton
        buttonIcon="clipboard check"
        buttonContent="Mark as completed"
        buttonColor="green"
        ref={this.popupRef}
      >
        <div className={styles.popupBody}>
          {!allGridBarcodesSet && (
            <Message negative size="tiny" className={styles.message}>
              <Icon name="exclamation triangle" size="large" />
              <div className={styles.messageContent}>
                All plates must be assigned a barcode before they can be marked
                completed.
              </div>
            </Message>
          )}
          {allGridBarcodesSet && (
            <Message positive size="tiny" className={styles.message}>
              <Icon name="check circle" size="large" />
              <div className={styles.messageContent}>
                This will write a snapshot of the current plates to Kapture.
                Plates will be editable after.
              </div>
            </Message>
          )}
          <Button
            disabled={!allGridBarcodesSet}
            onClick={this.handleClick}
            color="green"
          >
            Yes, mark as completed
          </Button>
        </div>
      </PopupButton>
    );
  }
}

MarkAsCompletedButton.propTypes = {
  onConfirm: PropTypes.func,
  allGridBarcodesSet: PropTypes.bool,
};
