import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../constants';
import { fetchExperiment } from '../../store/experimentActions';
import { ExperimentHeader } from '../../components/experiment/ExperimentHeader';
import { ExperimentDetails } from '../../components/experiment/ExperimentDetails';
import styles from './Experiment.module.css';

class Experiment extends Component {
  componentDidMount() {
    const { experimentId } = this.props.match.params;
    if (this.props.onMount) {
      this.props.onMount(experimentId);
    }
  }
  render() {
    const { experimentLoadingStatus, match } = this.props;
    return (
      <div>
        {experimentLoadingStatus === REQUEST_PENDING && (
          <div className={styles.loader}>
            <Loader active inline="centered">
              Loading experiment
            </Loader>
          </div>
        )}
        {experimentLoadingStatus === REQUEST_ERROR && (
          <div>An error occurred while retrieving the experiment</div>
        )}
        {experimentLoadingStatus === REQUEST_SUCCESS && (
          <div>
            <ExperimentHeader />
            <Switch>
              <Route
                path={`${match.path}`}
                exact
                component={ExperimentDetails}
              />
              <Route
                path={`${match.path}/editor`}
                component={() => {
                  return <div>editor</div>;
                }}
              />
            </Switch>
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
  const { experiment, experimentLoadingStatus } = state.experiment;
  return { experiment, experimentLoadingStatus };
};

const mapDispatch = {
  onMount: fetchExperiment,
};

const connected = connect(mapState, mapDispatch)(Experiment);
export { connected as Experiment };
