import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ActivityHeader.module.css';

export class ActivityHeader extends Component {
  render() {
    const { activity } = this.props;
    return (
      <div className={styles.activityHeader}>
        <div className={styles.activityName}>
          {activity ? `Activity: ${activity.name}` : null}
        </div>
      </div>
    );
  }
}

ActivityHeader.propTypes = {
  activity: PropTypes.object,
};
