import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ActivityHeader } from 'FetchApp/components';
import styles from './ActivityDetails.module.css';

export class ActivityDetails extends Component {
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  render() {
    return (
      <div className={styles.activityDetails}>
        <ActivityHeader />
      </div>
    );
  }
}

ActivityDetails.propTypes = {
  onUnmount: PropTypes.func,
};
