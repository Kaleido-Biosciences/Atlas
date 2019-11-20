import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import memoize from 'memoize-one';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

import {
  setCompletedStatus,
  addBarcodes,
} from '../../../store/designActions';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';
import { MarkAsCompletedButton } from './MarkAsCompletedButton';
import { ImportBarcodesButton } from './ImportBarcodesButton';
import styles from './ExperimentHeader.module.css';

class ExperimentHeader extends Component {
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
    const { experiment, saveStatus, lastSaveTime } = this.props;
    return (
      <div className={styles.experimentHeader}>
        <div className={styles.experimentName}>
          {experiment ? `Experiment ${experiment.name}` : null}
        </div>
        <div className={styles.container}>
          <div>{this.renderSaveInfo(saveStatus, lastSaveTime)}</div>
          <ImportBarcodesButton onImport={this.handleImport} />
          <MarkAsCompletedButton onConfirm={this.handleMarkAsCompleted} />
        </div>
      </div>
    );
  }
}

ExperimentHeader.propTypes = {
  experiment: PropTypes.object,
  saveStatus: PropTypes.string,
  lastSaveTime: PropTypes.number,
  onMarkAsCompleted: PropTypes.func,
  onComplete: PropTypes.func,
  onImport: PropTypes.func,
};

const mapState = (state, props) => {
  const { experiment, saveStatus, lastSaveTime } = state.designExperiment;
  return { experiment, saveStatus, lastSaveTime };
};

const mapDispatch = {
  onMarkAsCompleted: setCompletedStatus,
  onImport: addBarcodes,
};

const connected = connect(
  mapState,
  mapDispatch
)(ExperimentHeader);
export { connected as ExperimentHeader };
