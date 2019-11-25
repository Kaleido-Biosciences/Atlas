import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../constants';
import { fetchExperiment } from '../../store/experimentActions';
import styles from './Experiment.module.css';

class Experiment extends Component {
  componentDidMount() {
    const { experimentId } = this.props.match.params;
    if (this.props.onMount) {
      this.props.onMount(experimentId);
    }
  }
  render() {
    const { experiment, loadingStatus } = this.props;
    return (
      <div>
        {loadingStatus === REQUEST_PENDING && (
          <div className={styles.loader}>
            <Loader active inline="centered">
              Loading experiment
            </Loader>
          </div>
        )}
        {loadingStatus === REQUEST_SUCCESS && (
          <div>
            {experiment.name} {experiment.description}
          </div>
        )}
        {loadingStatus === REQUEST_ERROR && (
          <div>
            An error occurred while retrieving the experiment
          </div>
        )}
      </div>
    );
  }
}

Experiment.propTypes = {
  match: PropTypes.object.isRequired,
  onMount: PropTypes.func,
};

const mapState = (state, props) => {
  const { experiment, loadingStatus } = state.experiment;
  return { experiment, loadingStatus };
};

const mapDispatch = {
  onMount: fetchExperiment,
};

const connected = connect(mapState, mapDispatch)(Experiment);
export { connected as Experiment };
