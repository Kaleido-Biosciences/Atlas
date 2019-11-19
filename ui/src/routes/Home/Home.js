import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { ExperimentSearch } from '../../components/ExperimentSearch';
import styles from './Home.module.css';

export class Home extends Component {
  state = {
    toExperiment: false,
    experiment: null,
  };

  handleSelect = ({ experiment }) => {
    this.setState({
      toExperiment: true,
      experiment,
    });
  };

  render() {
    const { toExperiment, experiment } = this.state;
    if (toExperiment && experiment) {
      const path = `/experiment/${experiment.name}`;
      return <Redirect to={path} />;
    }
    return (
      <div className={styles.home}>
        <h1 className={styles.title}>Atlas</h1>
        <ExperimentSearch autoFocus onSelect={this.handleSelect} />
      </div>
    );
  }
}
