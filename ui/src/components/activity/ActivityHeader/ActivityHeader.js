import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ActivityHeader.module.css';

export class ActivityHeader extends Component {
  render() {
    const { activity, actions } = this.props;
    return (
      <div className={styles.activityHeader}>
        <div className={styles.activityName}>
          {activity ? `Activity: ${activity.name}` : null}
        </div>
        <div className={styles.container}>{actions}</div>
      </div>
    );
  }
}

ActivityHeader.propTypes = {
  activity: PropTypes.object,
  actions: PropTypes.object,
};
