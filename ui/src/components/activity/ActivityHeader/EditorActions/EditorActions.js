import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoize from 'memoize-one';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

import { setCompletedStatus, addBarcodes } from '../../../store/designActions';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';
import { MarkAsCompletedButton } from './MarkAsCompletedButton';
import { ImportBarcodesButton } from './ImportBarcodesButton';
export class EditorActions extends Component {
  renderSaveInfo = memoize((saveStatus, lastSaveTime) => {
    const saveTime = moment(lastSaveTime);
    let message;
    switch (saveStatus) {
      case REQUEST_PENDING:
        message = 'Saving experiment...';
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
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
  };
  handleImport = ({ barcodes }) => {
    if (this.props.onImport) {
      this.props.onImport({ barcodes });
    }
  };
  render() {
    return (
      <div className={styles.container}>
        <div>{this.renderSaveInfo(saveStatus, lastSaveTime)}</div>
        <ImportBarcodesButton onImport={this.handleImport} />
        <MarkAsCompletedButton onConfirm={this.handleMarkAsCompleted} />
      </div>
    );
  }
}

EditorActions.propTypes = {
  saveStatus: PropTypes.string,
  lastSaveTime: PropTypes.number,
  onMarkAsCompleted: PropTypes.func,
  onComplete: PropTypes.func,
  onImport: PropTypes.func,
};

const mapState = (state, props) => {
  const { saveStatus, lastSaveTime } = state.designExperiment;
  return { saveStatus, lastSaveTime };
};

const mapDispatch = {
  onMarkAsCompleted: setCompletedStatus,
  onImport: addBarcodes,
};

const connected = connect(mapState, mapDispatch)(EditorActions);
export { connected as EditorActions };
