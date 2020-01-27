import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './ActivityHeader.module.css';

export class ActivityHeader extends Component {
  render() {
    const { activityName, linkUrl, actions } = this.props;
    return (
      <div className={styles.activityHeader}>
        <div className={styles.activityName}>
          {activityName ? (
            <Link to={linkUrl}>{`Activity: ${activityName}`}</Link>
          ) : null}
        </div>
        <div className={styles.container}>{actions}</div>
      </div>
    );
  }
}

ActivityHeader.propTypes = {
  activityName: PropTypes.string,
  linkUrl: PropTypes.string,
  actions: PropTypes.object,
};
