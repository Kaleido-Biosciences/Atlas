import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Modal, Button, Icon } from 'semantic-ui-react';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../constants';
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
    const { open, publishStatus } = this.props;
    return (
      <Modal
        size="small"
        dimmer="inverted"
        open={open}
        className={styles.modal}
      >
        <Modal.Content>
          {publishStatus === REQUEST_PENDING && (
            <div>
              <Loader active inline="centered">
                Saving snapshot...
              </Loader>
            </div>
          )}
          {publishStatus === REQUEST_SUCCESS && (
            <div className={styles.saveSuccess}>
              <div>
                <Icon name="check circle" color="green" size="big" />
              </div>
              Snapshot saved.
            </div>
          )}
          {publishStatus === REQUEST_ERROR && (
            <div>Error occurred while saving.</div>
          )}
        </Modal.Content>
        {publishStatus === REQUEST_SUCCESS && (
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
  publishStatus: PropTypes.string,
  onBackToActivityClick: PropTypes.func,
  onPrintClick: PropTypes.func,
};