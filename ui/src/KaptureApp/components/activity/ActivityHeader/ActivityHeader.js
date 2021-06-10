import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import moment from 'moment';
import memoize from 'memoize-one';
import classNames from 'classnames';

import { CloneActivityModal } from './CloneActivityModal';
import styles from './ActivityHeader.module.css';

export class ActivityHeader extends Component {
  state = {
    cloneActivityModalOpen: false,
  };
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
  openCloneActivityModal = () => {
    this.setState({
      cloneActivityModalOpen: true,
    });
  };
  closeCloneActivityModal = () => {
    this.setState({
      cloneActivityModalOpen: false,
    });
  };
  render() {
    const { lastSaveTime, saveError, savePending, cloneSourceVersion } =
      this.props;
    const disableClone =
      cloneSourceVersion &&
      cloneSourceVersion.plateMaps &&
      cloneSourceVersion.plateMaps.length
        ? false
        : true;
    return (
      <div className={styles.activityHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.name}>
            <Link to={this.props.linkUrl}>
              {`Activity${this.props.name ? `: ${this.props.name}` : ''}`}
            </Link>
          </div>
          <div className={styles.saveAndButtonsContainer}>
            {this.renderSaveInfo(savePending, lastSaveTime, saveError)}
            <Button
              content="Clone Activity"
              disabled={disableClone}
              icon="clone"
              onClick={this.openCloneActivityModal}
              primary
              size="mini"
            />
            <CloneActivityModal
              onClose={this.closeCloneActivityModal}
              onGoToActivityClick={this.props.onGoToActivityClick}
              open={this.state.cloneActivityModalOpen}
            />
          </div>
        </div>
        <div className={styles.actions}>{this.props.actions}</div>
      </div>
    );
  }
}

ActivityHeader.propTypes = {
  actions: PropTypes.object,
  cloneSourceVersion: PropTypes.object,
  lastSaveTime: PropTypes.number,
  linkUrl: PropTypes.string,
  name: PropTypes.string,
  onGoToActivityClick: PropTypes.func,
  saveError: PropTypes.string,
  savePending: PropTypes.bool,
};
