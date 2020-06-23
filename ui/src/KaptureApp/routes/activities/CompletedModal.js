import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Modal, Button, Icon } from 'semantic-ui-react';

import styles from './CompletedModal.module.css';

export class CompletedModal extends Component {
  handleBackToActivity = () => {
    if (this.props.onBackToActivityClick) {
      this.props.onBackToActivityClick();
    }
  };
  handlePrint = () => {
    if (this.props.onPrintClick) {
      this.props.onPrintClick();
    }
  };
  render() {
    const { open, pending, success, error } = this.props;
    let content;
    if (pending) {
      content = (
        <div>
          <Loader active inline="centered">
            Saving snapshot...
          </Loader>
        </div>
      );
    } else if (success) {
      content = (
        <div className={styles.saveSuccess}>
          <div>
            <Icon name="check circle" color="green" size="big" />
          </div>
          Snapshot saved.
        </div>
      );
    } else if (error) {
      content = <div>Error occurred while saving: {error}</div>;
    }
    return (
      <Modal
        size="small"
        dimmer="inverted"
        open={open}
        className={styles.modal}
      >
        <Modal.Content>{content}</Modal.Content>
        {success && (
          <Modal.Actions>
            <Button secondary onClick={this.handlePrint}>
              Print Plates
            </Button>
            <Button primary onClick={this.handleBackToActivity}>
              Back to Activities
            </Button>
          </Modal.Actions>
        )}
      </Modal>
    );
  }
}

CompletedModal.propTypes = {
  open: PropTypes.bool,
  pending: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.string,
  onBackToActivityClick: PropTypes.func,
  onPrintClick: PropTypes.func,
};
