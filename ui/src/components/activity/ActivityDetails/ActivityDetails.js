import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import { Version } from './Version';
import { NewActivity } from './NewActivity';
import { STATUS_DRAFT, STATUS_COMPLETED } from '../../../constants';
import styles from './ActivityDetails.module.css';

export class ActivityDetails extends Component {
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  handleVersionClick = ({ version: v }) => {
    const { experiment_status, version } = v;
    const status = experiment_status.split('_')[1];
    let url = this.props.match.url;
    url = url.endsWith('/') ? url.slice(0, -1) : url;
    if (status === STATUS_COMPLETED) {
      this.props.history.push(
        url + `/print?status=${experiment_status}&version=${version}`
      );
    } else if (status === STATUS_DRAFT) {
      this.props.history.push(
        url + `/editor?status=${experiment_status}&version=${version}`
      );
    }
  };
  handlePlateSizeChange = ({ plateSize }) => {
    if (this.props.onPlateSizeChange) {
      this.props.onPlateSizeChange({ plateSize });
    }
  };
  handleSubmit = () => {
    const activityName = this.props.activity.name;
    let url = this.props.match.url;
    url = url.endsWith('/') ? url.slice(0, -1) : url;
    this.props.history.push(
      url + `/editor?status=${activityName}_DRAFT&version=0`
    );
  };
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
  render() {
    const { versions, plateSize } = this.props;
    let content;
    if (versions.length) {
      content = this.renderVersions(versions);
    } else {
      content = (
        <div className={styles.newActivityContainer}>
          <NewActivity
            defaultPlateSize={plateSize}
            onPlateSizeChange={this.handlePlateSizeChange}
            onSubmit={this.handleSubmit}
          />
        </div>
      );
    }
    return <div className={styles.experimentDetails}>{content}</div>;
  }
}

ActivityDetails.propTypes = {
  activity: PropTypes.object,
  versions: PropTypes.array,
  plateSize: PropTypes.object,
  onPlateSizeChange: PropTypes.func,
  onUnmount: PropTypes.func,
};
