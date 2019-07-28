import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './PrintStep.module.css';

class PrintStep extends Component {
  render() {
    const { experiment, plateMaps } = this.props;
    return (
      <div className={styles.printStep}>
        <h4>Experiment</h4>
        <div>{JSON.stringify(experiment)}</div>
        <h4>Plate Maps</h4>
        <div>{JSON.stringify(plateMaps)}</div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const { experiment, plateMaps } = state.createExperiment;
  return {
    experiment,
    plateMaps,
  };
};

const connected = connect(mapState)(PrintStep);
export { connected as PrintStep };
