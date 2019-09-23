import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Button } from 'semantic-ui-react';

import { PopupButton } from '../../PopupButton';
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
    return (
      <PopupButton
        buttonIcon="clipboard check"
        buttonContent="Mark as completed"
        buttonColor="green"
        ref={this.popupRef}
      >
        <div className={styles.popupBody}>
          <Message size="tiny" className={styles.message}>
            Are you sure? You will no longer be able to edit plates in this
            experiment.
          </Message>
          <Button onClick={this.handleClick} color="green">
            Yes, mark as completed
          </Button>
        </div>
      </PopupButton>
    );
  }
}

MarkAsCompletedButton.propTypes = {
  onConfirm: PropTypes.func,
};
