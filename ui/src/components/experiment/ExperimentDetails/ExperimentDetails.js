import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';
import { fetchExperimentVersions } from '../../../store/experimentActions';
import styles from './ExperimentDetails.module.css';

class ExperimentDetails extends Component {
  componentDidMount() {
    const { name } = this.props.experiment;
    if (this.props.onMount) {
      this.props.onMount(name);
    }
  }
  render() {
    const { experiment, versionsLoadingStatus, versions } = this.props;
    return (
      <div>
        {versionsLoadingStatus === REQUEST_PENDING && (
          <div className={styles.loader}>
            <Loader active inline="centered">
              Loading versions
            </Loader>
          </div>
        )}
        {versionsLoadingStatus === REQUEST_ERROR && (
          <div>An error occurred while retrieving versions</div>
        )}
        {versionsLoadingStatus === REQUEST_SUCCESS && (
          <div>{versions.length}</div>
        )}
        {experiment.name} {experiment.description}
      </div>
    );
  }
}

ExperimentDetails.propTypes = {
  experiment: PropTypes.object,
  versionsLoadingStatus: PropTypes.string,
  onMount: PropTypes.func,
};

const mapState = (state, props) => {
  const { experiment, versionsLoadingStatus, versions } = state.experiment;
  return { experiment, versionsLoadingStatus, versions };
};

const mapDispatch = {
  onMount: fetchExperimentVersions,
};

const connected = connect(mapState, mapDispatch)(ExperimentDetails);
export { connected as ExperimentDetails };
