import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Card } from 'semantic-ui-react';
import moment from 'moment';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  STATUS_COMPLETED,
} from '../../../constants';
import { fetchExperimentVersions } from '../../../store/experimentActions';
import styles from './ExperimentDetails.module.css';

const ldapToJS = n => {
  return new Date(n / 1e4 - 1.16444736e13);
};

class ExperimentDetails extends Component {
  componentDidMount() {
    const { name } = this.props.experiment;
    if (this.props.onMount) {
      this.props.onMount(name);
    }
  }
  renderVersions(versions) {
    return versions.map(version => {
      const status = version.experiment_status.split('_')[1];
      const count = version.plateMaps.length;
      const key = version.version;
      let displayTime = '-';
      if (status === STATUS_COMPLETED) {
        const jsTime = ldapToJS(version.version);
        const saveTime = moment(jsTime);
        displayTime = saveTime.format('MMMM Do YYYY, h:mm a');
      }
      return (
        <Card link key={key}>
          <Card.Content>
            <Card.Header>{status}</Card.Header>
            <Card.Meta>
              <span>{displayTime}</span>
            </Card.Meta>
            <Card.Description>{count} plates</Card.Description>
          </Card.Content>
        </Card>
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
