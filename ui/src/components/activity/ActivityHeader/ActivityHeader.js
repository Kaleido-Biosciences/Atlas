import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './ActivityHeader.module.css';

class ActivityHeader extends Component {
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

const mapState = (state, props) => {
  const { activity } = state.activities;
  return { activity };
};

const mapDispatch = {};

const connected = connect(mapState, mapDispatch)(ActivityHeader);
export { connected as ActivityHeader };
