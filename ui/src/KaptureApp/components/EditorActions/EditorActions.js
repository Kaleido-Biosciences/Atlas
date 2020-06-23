import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoize from 'memoize-one';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

import { MarkAsCompletedButton } from './MarkAsCompletedButton';
import { ImportBarcodesButton } from './ImportBarcodesButton';
import styles from './EditorActions.module.css';

export class EditorActions extends Component {
  renderSaveInfo = memoize((savePending, lastSaveTime, saveError) => {
    let message;
    if (savePending) {
      message = 'Saving containers...';
    } else if (lastSaveTime) {
      const saveTime = moment(lastSaveTime);
      message = `Autosaved at ${saveTime.format('LT')}`;
    } else if (saveError) {
      message = 'An error occurred while saving. Changes may not be saved.';
    } else {
      message = '';
    }
    const saveClass = classNames(styles.lastSave, {
      [styles.error]: saveError,
    });
    return (
      <div className={saveClass}>
        {saveError ? <Icon name="warning sign" /> : null}
        {message}
      </div>
    );
  });
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
    const { savePending, lastSaveTime, saveError } = this.props;
    return (
      <React.Fragment>
        <div>{this.renderSaveInfo(savePending, lastSaveTime, saveError)}</div>
        <ImportBarcodesButton onImport={this.handleImportBarcodes} />
        <MarkAsCompletedButton onConfirm={this.handleMarkAsCompleted} />
      </React.Fragment>
    );
  }
}

EditorActions.propTypes = {
  savePending: PropTypes.bool,
  lastSaveTime: PropTypes.number,
  saveError: PropTypes.string,
  onMarkAsCompleted: PropTypes.func,
  onImportBarcodes: PropTypes.func,
};
