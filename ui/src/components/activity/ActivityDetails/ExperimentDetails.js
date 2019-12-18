import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Card } from 'semantic-ui-react';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';
import {
  fetchExperimentVersions,
  setPlateSize,
} from '../../../store/experimentActions';
import { Version } from './Version';
import { NewExperiment } from './NewExperiment';
import styles from './ExperimentDetails.module.css';

class ExperimentDetails extends Component {
  handleVersionClick = ({ version: v }) => {
    const { experiment_status, version } = v;
    let url = this.props.match.url;
    url = url.endsWith('/') ? url.slice(0, -1) : url;
    this.props.history.push(
      url + `/editor?status=${experiment_status}&version=${version}`
    );
  };
  handlePlateSizeChange = ({ plateSize }) => {
    if (this.props.onPlateSizeChange) {
      this.props.onPlateSizeChange({ plateSize });
    }
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
    const { versions, plateSize } = this.props;
    if (this.props.versions.length) {
      return this.renderVersions(versions);
    } else {
      return (
        <div className={styles.newExperimentContainer}>
          <NewExperiment
            defaultPlateSize={plateSize}
            onPlateSizeChange={this.handlePlateSizeChange}
          />
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
  onPlateSizeChange: PropTypes.func,
};

const mapState = (state, props) => {
  const {
    experiment,
    versionsLoadingStatus,
    versions,
    plateSize,
  } = state.experiment;
  return { experiment, versionsLoadingStatus, versions, plateSize };
};

const mapDispatch = {
  onMount: fetchExperimentVersions,
  onPlateSizeChange: setPlateSize,
};

const connected = connect(mapState, mapDispatch)(ExperimentDetails);
export { connected as ExperimentDetails };
