import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ExperimentSearch } from '../../components/experiment/ExperimentSearch';
import { setExperiment } from '../../store/experimentActions';
import styles from './Home.module.css';

class Home extends Component {
  handleSelect = ({ experiment }) => {
    if (this.props.onSelect) {
      this.props.onSelect({ experiment });
    }
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

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  onSelect: setExperiment,
};

const connected = connect(mapState, mapDispatch)(Home);
export { connected as Home };
