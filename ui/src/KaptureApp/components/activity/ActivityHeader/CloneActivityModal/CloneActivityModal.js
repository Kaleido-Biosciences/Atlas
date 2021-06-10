import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button, Loader, Icon } from 'semantic-ui-react';

import { ActivitySearch } from 'AtlasUI/components';
import styles from './CloneActivityModal.module.css';

export class CloneActivityModal extends Component {
  handleActivitySelect = ({ id, name }) => {
    if (this.props.onActivitySelect) {
      this.props.onActivitySelect(id, name);
    }
  };
  handleOnAddClick = () => {
    if (this.props.onClone) {
      this.props.onClone('add');
    }
  };
  handleOnReplaceClick = () => {
    if (this.props.onClone) {
      this.props.onClone('replace');
    }
  };
  handleClose = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    if (this.props.onClose()) {
      this.props.onClose();
    }
  };
  handleGoToActivityClick = () => {
    this.handleClose();
    if (this.props.onGoToActivityClick) {
      this.props.onGoToActivityClick(this.props.cloneTargetId);
    }
  };
  renderActions() {
    const { cloneTargetName, cloneTargetVersion } = this.props;
    let message = '',
      buttons;
    if (
      cloneTargetVersion &&
      cloneTargetVersion.plateMaps &&
      cloneTargetVersion.plateMaps.length
    ) {
      const numPlates = cloneTargetVersion.plateMaps.length;
      message = `${numPlates} ${numPlates === 1 ? 'plate' : 'plates'}`;
      buttons = (
        <div className={styles.buttons}>
          <Button
            onClick={this.handleOnAddClick}
            primary
          >{`Add to ${cloneTargetName} draft`}</Button>
          <Button
            onClick={this.handleOnReplaceClick}
            primary
          >{`Replace ${cloneTargetName} draft`}</Button>
        </div>
      );
    } else {
      message = `0 plates`;
      buttons = (
        <div className={styles.buttons}>
          <Button
            onClick={this.handleOnReplaceClick}
            primary
          >{`Clone to ${cloneTargetName} draft`}</Button>
        </div>
      );
    }
    return (
      <div className={styles.actions}>
        <div>
          <div>
            <strong>Source: </strong>
            {`${this.props.cloneSourceName}, ${
              this.props.cloneSourceVersion.plateMaps.length
            } ${
              this.props.cloneSourceVersion.plateMaps.length === 1
                ? 'plate'
                : 'plates'
            }`}
          </div>
          <div>
            <strong>Target: </strong>
            {`${this.props.cloneTargetName}, ${message}`}
          </div>
        </div>
        {buttons}
      </div>
    );
  }
  renderTargetSelection() {
    const { cloneTargetVersionFetchStatus } = this.props;
    return (
      <div>
        {!cloneTargetVersionFetchStatus.error && (
          <ActivitySearch
            error={this.props.activitySearchError}
            loading={this.props.activitySearchLoading}
            results={this.props.activitySearchResults}
            value={this.props.activitySearchValue}
            onChange={this.props.onActivitySearchChange}
            onSelect={this.handleActivitySelect}
            placeholder="Search for an activity/clone target"
          />
        )}
        {cloneTargetVersionFetchStatus.pending && (
          <Loader active inline="centered">
            Checking target...
          </Loader>
        )}
        {cloneTargetVersionFetchStatus.success && this.renderActions()}
        {cloneTargetVersionFetchStatus.error && (
          <div className={styles.message}>
            <Icon name="warning circle" color="red" size="huge" />
            <div className={styles.messageText}>An error has occurred</div>
            <div>{cloneTargetVersionFetchStatus.error}</div>
            <Button
              className={styles.messageButton}
              onClick={this.props.onReset}
            >
              Start over
            </Button>
          </div>
        )}
      </div>
    );
  }
  renderCloneStatus() {
    return (
      <div>
        {this.props.cloneStatus.pending && (
          <Loader active inline="centered">
            Cloning...
          </Loader>
        )}
        {this.props.cloneStatus.success && (
          <div className={styles.message}>
            <Icon name="check circle" color="green" size="huge" />
            <div className={styles.messageText}>
              Activity cloned successfully
            </div>
            <Button
              className={styles.messageButton}
              onClick={this.handleGoToActivityClick}
            >{`Go to ${this.props.cloneTargetName}`}</Button>
          </div>
        )}
        {this.props.cloneStatus.error && (
          <div className={styles.message}>
            <Icon name="warning circle" color="red" size="huge" />
            <div className={styles.messageText}>An error has occurred</div>
            <div>{this.props.cloneStatus.error}</div>
            <Button
              className={styles.messageButton}
              onClick={this.props.onReset}
            >
              Start over
            </Button>
          </div>
        )}
      </div>
    );
  }
  render() {
    const { cloneStatus } = this.props;
    const displayCloneStatus =
      cloneStatus.pending || cloneStatus.success || cloneStatus.error;
    return (
      <Modal
        open={this.props.open}
        onClose={this.handleClose}
        closeIcon
        size="small"
        dimmer="inverted"
      >
        <Header icon="clone" content="Clone Activity" />
        <Modal.Content>
          {!displayCloneStatus
            ? this.renderTargetSelection()
            : this.renderCloneStatus()}
        </Modal.Content>
      </Modal>
    );
  }
}

CloneActivityModal.propTypes = {
  activitySearchError: PropTypes.string,
  activitySearchLoading: PropTypes.bool,
  activitySearchResults: PropTypes.array,
  activitySearchValue: PropTypes.string,
  cloneSourceName: PropTypes.string,
  cloneSourceVersion: PropTypes.object,
  cloneStatus: PropTypes.object,
  cloneTargetId: PropTypes.number,
  cloneTargetName: PropTypes.string,
  cloneTargetVersion: PropTypes.object,
  cloneTargetVersionFetchStatus: PropTypes.object,
  onActivitySearchChange: PropTypes.func,
  onActivitySelect: PropTypes.func,
  onClone: PropTypes.func,
  onClose: PropTypes.func,
  onGoToActivityClick: PropTypes.func,
  onReset: PropTypes.func,
  open: PropTypes.bool,
};
