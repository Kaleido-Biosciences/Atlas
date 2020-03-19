import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';

import styles from './ApplyTool.module.css';

export class SelectedContainers extends Component {
  handleApplyClick = () => {
    if (this.props.onApplyClick) {
      this.props.onApplyClick();
    }
  };
  renderSelectedContainersSummary() {
    const { selectedContainersSummary } = this.props;
    if (selectedContainersSummary) {
      let headerText;
      if (selectedContainersSummary.count > 0) {
        headerText = 'Selected Containers';
      } else {
        headerText = 'No containers selected.';
      }
      return (
        <div className={styles.selectedContainersText}>
          <Header size="tiny">{headerText}</Header>
          {selectedContainersSummary.text}
        </div>
      );
    }
  }
  render() {
    const { selectedContainersSummary, showButton, buttonDisabled } = this.props;
    return (
      <div>
        {this.renderSelectedContainersSummary()}
        {showButton ? (
          <div className={styles.selectedContainersButtonContainer}>
            <Button
              disabled={buttonDisabled}
              primary
              onClick={this.handleApplyClick}
              size="mini"
            >
              Apply to {selectedContainersSummary.count} containers
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

SelectedContainers.propTypes = {
  selectedContainersSummary: PropTypes.array,
  showButton: PropTypes.bool,
  buttonDisabled: PropTypes.bool,
  onApplyClick: PropTypes.func,
};
