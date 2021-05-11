import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import memoize from 'memoize-one';
import classNames from 'classnames';

import styles from './ActivityHeader.module.css';

export class ActivityHeader extends Component {
  renderSaveInfo = memoize((savePending, lastSaveTime, saveError) => {
    let message;
    if (savePending) {
      message = 'Saving containers...';
    } else if (lastSaveTime) {
      const saveTime = moment(lastSaveTime);
      message = `Autosaved at ${saveTime.format('LT')}`;
    } else if (saveError) {
      message = 'An error occurred while saving. Changes may not be saved.';
    } else {
      message = '';
    }
    const saveClass = classNames(styles.lastSave, {
      [styles.error]: saveError,
    });
    return (
      <div className={saveClass}>
        {saveError ? <Icon name="warning sign" /> : null}
        {message}
      </div>
    );
  });
  render() {
    const { lastSaveTime, saveError, savePending } = this.props;
    return (
      <div className={styles.activityHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.name}>
            <Link to={this.props.linkUrl}>
              {`Activity${this.props.name ? `: ${this.props.name}` : ''}`}
            </Link>
          </div>
          <div>{this.renderSaveInfo(savePending, lastSaveTime, saveError)}</div>
        </div>
        <div className={styles.actions}>{this.props.actions}</div>
      </div>
    );
  }
}

ActivityHeader.propTypes = {
  actions: PropTypes.object,
  lastSaveTime: PropTypes.number,
  linkUrl: PropTypes.string,
  name: PropTypes.string,
  saveError: PropTypes.string,
  savePending: PropTypes.bool,
};
