import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { setCompletedStatus } from '../../../store/experimentActions';
import { MarkAsCompletedButton } from './MarkAsCompletedButton';
import styles from './ExperimentHeader.module.css';

class ExperimentHeader extends Component {
  handleMarkAsCompleted = () => {
    if (this.props.onMarkAsCompleted) {
      this.props.onMarkAsCompleted();
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
  };
  renderSaveInfo() {
    const { saveStatus, lastSaveTime } = this.props;
    const saveTime = moment(lastSaveTime);
    let message;
    switch (saveStatus) {
      case 'PENDING':
        message = 'Saving experiment...';
        break;
      case 'SUCCESS':
        message = `Autosaved at ${saveTime.format('LT')}`;
        break;
      case 'ERROR':
        message = 'An error occurred while saving. Changes may not be saved.';
        break;
      default:
        message = '';
    }
    return <div>{message}</div>;
  }
  render() {
    const { experiment } = this.props;
    return (
      <div className={styles.experimentHeader}>
        <div className={styles.experimentName}>
          {experiment ? `Experiment ${experiment.name}` : null}
        </div>
        <div className={styles.container}>
          <div className={styles.lastSave}>{this.renderSaveInfo()}</div>
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
};

const mapState = (state, props) => {
  const { experiment, saveStatus, lastSaveTime } = state.designExperiment;
  return { experiment, saveStatus, lastSaveTime };
};

const mapDispatch = {
  onMarkAsCompleted: setCompletedStatus,
};

const connected = connect(
  mapState,
  mapDispatch
)(ExperimentHeader);
export { connected as ExperimentHeader };
