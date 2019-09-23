import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  render() {
    const { experiment } = this.props;
    return (
      <div className={styles.experimentHeader}>
        <div className={styles.experimentName}>
          {experiment ? `Experiment ${experiment.name}` : null}
        </div>
        <div>
          <MarkAsCompletedButton onConfirm={this.handleMarkAsCompleted} />
        </div>
      </div>
    );
  }
}

ExperimentHeader.propTypes = {
  experiment: PropTypes.object,
  onMarkAsCompleted: PropTypes.func,
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  const { experiment } = state.designExperiment;
  return { experiment };
};

const mapDispatch = {
  onMarkAsCompleted: setCompletedStatus,
};

const connected = connect(
  mapState,
  mapDispatch
)(ExperimentHeader);
export { connected as ExperimentHeader };
