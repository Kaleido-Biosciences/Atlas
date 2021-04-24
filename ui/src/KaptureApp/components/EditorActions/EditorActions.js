import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MarkAsCompletedButton } from './MarkAsCompletedButton';
import { ImportBarcodesButton } from './ImportBarcodesButton';

export class EditorActions extends Component {
  handleMarkAsCompleted = () => {
    if (this.props.onMarkAsCompleted) {
      this.props.onMarkAsCompleted();
    }
  };
  handleImportBarcodes = ({ barcodes }) => {
    if (this.props.onImportBarcodes) {
      this.props.onImportBarcodes({ barcodes });
    }
  };
  render() {
    return (
      <React.Fragment>
        <ImportBarcodesButton onImport={this.handleImportBarcodes} />
        <MarkAsCompletedButton
          allGridBarcodesSet={this.props.allGridBarcodesSet}
          onConfirm={this.handleMarkAsCompleted}
        />
      </React.Fragment>
    );
  }
}

EditorActions.propTypes = {
  allGridBarcodesSet: PropTypes.bool,
  onImportBarcodes: PropTypes.func,
  onMarkAsCompleted: PropTypes.func,
};
