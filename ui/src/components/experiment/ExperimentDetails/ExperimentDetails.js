import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Card } from 'semantic-ui-react';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';
import { fetchExperimentVersions } from '../../../store/experimentActions';
import { Version } from './Version';
import { NewExperiment } from './NewExperiment';
import styles from './ExperimentDetails.module.css';

class ExperimentDetails extends Component {
  handleVersionClick = ({ version }) => {
    console.log(version);
  };
  componentDidMount() {
    const { name } = this.props.experiment;
    if (this.props.onMount) {
      this.props.onMount(name);
    }
  }
  renderVersions(versions) {
    return (
      <Card.Group>
        {versions.map(version => {
          const key = version.version;
          return (
            <Version
              key={key}
              version={version}
              onClick={this.handleVersionClick}
            />
          );
        })}
      </Card.Group>
    );
  }
  renderContent() {
    const { versions, defaultPlateSize } = this.props;
    if (this.props.versions.length) {
      return this.renderVersions(versions);
    } else {
      return (
        <div className={styles.newExperimentContainer}>
          <NewExperiment defaultPlateSize={defaultPlateSize} />
        </div>
      );
    }
  }
  render() {
    const { versionsLoadingStatus } = this.props;
    return (
      <div className={styles.experimentDetails}>
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
        {versionsLoadingStatus === REQUEST_SUCCESS && this.renderContent()}
      </div>
    );
  }
}

ExperimentDetails.propTypes = {
  experiment: PropTypes.object,
  versions: PropTypes.array,
  versionsLoadingStatus: PropTypes.string,
  onMount: PropTypes.func,
};

const mapState = (state, props) => {
  const {
    experiment,
    versionsLoadingStatus,
    versions,
    defaultPlateSize,
  } = state.experiment;
  return { experiment, versionsLoadingStatus, versions, defaultPlateSize };
};

const mapDispatch = {
  onMount: fetchExperimentVersions,
};

const connected = connect(mapState, mapDispatch)(ExperimentDetails);
export { connected as ExperimentDetails };
