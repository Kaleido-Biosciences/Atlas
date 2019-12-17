import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './ExperimentHeader.module.css';

class ExperimentHeader extends Component {
  render() {
    const { experiment } = this.props;
    return (
      <div className={styles.experimentHeader}>
        <div className={styles.experimentName}>
          {experiment ? `Experiment ${experiment.name}` : null}
        </div>
      </div>
    );
  }
}

ExperimentHeader.propTypes = {
  experiment: PropTypes.object,
};

const mapState = (state, props) => {
  const { experiment } = state.experiment;
  return { experiment };
};

const mapDispatch = {};

const connected = connect(mapState, mapDispatch)(ExperimentHeader);
export { connected as ExperimentHeader };
