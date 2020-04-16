import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './ActivityHeader.module.css';

export class ActivityHeader extends Component {
  render() {
    const { name, linkUrl, actions } = this.props;
    return (
      <div className={styles.activityHeader}>
        <div className={styles.name}>
          <Link to={linkUrl}>{`Activity${name ? `: ${name}` : ''}`}</Link>
        </div>
        <div className={styles.actions}>{actions}</div>
      </div>
    );
  }
}

ActivityHeader.propTypes = {
  name: PropTypes.string,
  linkUrl: PropTypes.string,
  actions: PropTypes.object,
};
