import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import { Version } from './Version';
import { NewExperiment } from './NewExperiment';
import styles from './ActivityDetails.module.css';

export class ActivityDetails extends Component {
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
        <div className={styles.newExperimentContainer}>
          <NewExperiment
            defaultPlateSize={plateSize}
            onPlateSizeChange={this.handlePlateSizeChange}
          />
        </div>
      );
    }
    return <div className={styles.experimentDetails}>{content}</div>;
  }
}

ActivityDetails.propTypes = {
  versions: PropTypes.array,
  plateSize: PropTypes.object,
  onPlateSizeChange: PropTypes.func,
};
