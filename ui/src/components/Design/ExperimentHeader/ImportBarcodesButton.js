import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Button, TextArea } from 'semantic-ui-react';

import { PopupButton } from '../../PopupButton';
import styles from './ImportBarcodesButton.module.css';

const initialState = {
  barcodes: [],
  barcodesAdded: false,
};

export class ImportBarcodesButton extends Component {
  state = initialState;
  popupRef = React.createRef();
  handleImport = e => {
    e.preventDefault();
    if (this.props.onImport) {
      this.props.onImport({ barcodes: this.state.barcodes });
      this.setState({ barcodesAdded: true });
    }
  };
  handleChange = (e, data) => {
    if (!data.value) {
      this.setState({ barcodes: [] });
    } else {
      this.setState({ barcodes: data.value.trim().split(/\r|\n/) });
    }
  };
  closePopup = () => {
    this.popupRef.current.handlePopupClose();
  };
  resetState = () => {
    this.setState(initialState);
  };
  render() {
    const { barcodes, barcodesAdded } = this.state;
    const count = barcodes.length;
    const buttonDisabled = count === 0;
    const buttonText =
      count > 0 ? `Import ${count} barcodes` : 'Import barcodes';
    return (
      <PopupButton
        buttonIcon="barcode"
        buttonContent="Import Barcodes"
        buttonColor="blue"
        ref={this.popupRef}
        onOpen={this.resetState}
      >
        <div>
          {!barcodesAdded && (
            <Form>
              <div className={styles.container}>
                <TextArea
                  placeholder="Enter barcodes to import"
                  onChange={this.handleChange}
                  className={styles.textArea}
                />
                <Button
                  disabled={buttonDisabled}
                  onClick={this.handleImport}
                  className={styles.button}
                  primary
                >
                  {buttonText}
                </Button>
              </div>
            </Form>
          )}
          {barcodesAdded && (
            <div className={styles.container}>
              <Message size="tiny" className={styles.message}>
                Barcodes imported.
              </Message>
              <Button
                className={styles.button}
                onClick={this.closePopup}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </PopupButton>
    );
  }
}

ImportBarcodesButton.propTypes = {
  onImport: PropTypes.func,
};
