import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';

import { REQUEST_PENDING, REQUEST_ERROR } from '../../constants';
import { fetchExperiment } from '../../store/experimentActions';
import { ExperimentHeader } from '../../components/experiment/ExperimentHeader';
import { ExperimentDetails } from '../../components/experiment/ExperimentDetails';
import { Editor } from '../../components/experiment/Editor';
import styles from './Activity.module.css';

class Activity extends Component {
  componentDidMount() {
    const { experimentId } = this.props.match.params;
    const { experiment } = this.props;
    if (!experiment || experiment.id !== parseInt(experimentId)) {
      this.props.fetchExperiment(experimentId);
    }
  }
  render() {
    const { experiment, experimentLoadingStatus, match } = this.props;
    return (
      <div className={styles.experiment}>
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
        {experiment && (
          <React.Fragment>
            <ExperimentHeader />
            <Switch>
              <Route
                path={`${match.path}`}
                exact
                component={ExperimentDetails}
              />
              <Route path={`${match.path}/editor`} component={Editor} />
            </Switch>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Activity.propTypes = {
  match: PropTypes.object.isRequired,
  fetchExperiment: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const { experiment, experimentLoadingStatus } = state.experiment;
  return { experiment, experimentLoadingStatus };
};

const mapDispatch = {
  fetchExperiment: fetchExperiment,
};

const connected = connect(mapState, mapDispatch)(Activity);
export { connected as Activity };
