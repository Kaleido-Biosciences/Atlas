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
    return versions.map(version => {
      const key = version.version;
      return (
        <Version
          key={key}
          version={version}
          onClick={this.handleVersionClick}
        />
      );
    });
  }
  render() {
    const { versions, versionsLoadingStatus } = this.props;
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
        {versionsLoadingStatus === REQUEST_SUCCESS && (
          <Card.Group>{this.renderVersions(versions)}</Card.Group>
        )}
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
  const { experiment, versionsLoadingStatus, versions } = state.experiment;
  return { experiment, versionsLoadingStatus, versions };
};

const mapDispatch = {
  onMount: fetchExperimentVersions,
};

const connected = connect(mapState, mapDispatch)(ExperimentDetails);
export { connected as ExperimentDetails };
