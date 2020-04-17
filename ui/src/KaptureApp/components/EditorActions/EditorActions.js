import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoize from 'memoize-one';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../constants';
import { MarkAsCompletedButton } from './MarkAsCompletedButton';
import { ImportBarcodesButton } from './ImportBarcodesButton';
import styles from './EditorActions.module.css';

export class EditorActions extends Component {
  renderSaveInfo = memoize((saveStatus, lastSaveTime) => {
    const saveTime = moment(lastSaveTime);
    let message;
    switch (saveStatus) {
      case REQUEST_PENDING:
        message = 'Saving containers...';
        break;
      case REQUEST_SUCCESS:
        message = `Autosaved at ${saveTime.format('LT')}`;
        break;
      case REQUEST_ERROR:
        message = 'An error occurred while saving. Changes may not be saved.';
        break;
      default:
        message = '';
    }
    const saveClass = classNames(styles.lastSave, {
      [styles.error]: saveStatus === REQUEST_ERROR,
    });
    return (
      <div className={saveClass}>
        {saveStatus === REQUEST_ERROR ? <Icon name="warning sign" /> : null}
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
    const { saveStatus, lastSaveTime } = this.props;
    return (
      <React.Fragment>
        <div>{this.renderSaveInfo(saveStatus, lastSaveTime)}</div>
        <ImportBarcodesButton onImport={this.handleImportBarcodes} />
        <MarkAsCompletedButton onConfirm={this.handleMarkAsCompleted} />
      </React.Fragment>
    );
  }
}

EditorActions.propTypes = {
  saveStatus: PropTypes.string,
  lastSaveTime: PropTypes.number,
  onMarkAsCompleted: PropTypes.func,
  onImportBarcodes: PropTypes.func,
};
