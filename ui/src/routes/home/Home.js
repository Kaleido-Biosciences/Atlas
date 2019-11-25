import React, { Component } from 'react';

import { ExperimentSearch } from '../../components/experiment/ExperimentSearch';
import styles from './Home.module.css';

export class Home extends Component {
  handleSelect = ({ experiment }) => {
    this.props.history.push(`/experiments/${experiment.id}`);
  };

  render() {
    return (
      <div className={styles.home}>
        <h1 className={styles.title}>Atlas</h1>
        <ExperimentSearch autoFocus onSelect={this.handleSelect} />
      </div>
    );
  }
}
