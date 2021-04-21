import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';

import styles from './SelectedContainers.module.css';

export class SelectedContainers extends Component {
  handleButtonClick = () => {
    if (this.props.onButtonClick) this.props.onButtonClick();
  };
  renderSelectedContainersSummary() {
    let headerText;
    if (this.props.selectedContainersSummary.count > 0) {
      headerText = 'Selected Containers';
    } else {
      headerText = 'No containers selected.';
    }
    return (
      <div className={styles.text}>
        <Header size="tiny">{headerText}</Header>
        {this.props.selectedContainersSummary.text}
      </div>
    );
  }
  render() {
    const { selectedContainersSummary, buttonDisabled } = this.props;
    let disabled = buttonDisabled || false;
    if (selectedContainersSummary.count === 0) {
      disabled = true;
    }
    const containerText =
      selectedContainersSummary.count === 1 ? 'container' : 'containers';
    return (
      <div className={styles.selectedContainers}>
        {this.renderSelectedContainersSummary()}
        <div className={styles.buttonContainer}>
          <Button
            disabled={disabled}
            primary
            onClick={this.handleButtonClick}
            size="mini"
          >
            {`${this.props.buttonText} ${selectedContainersSummary.count} ${containerText}`}
          </Button>
        </div>
      </div>
    );
  }
}

SelectedContainers.propTypes = {
  buttonDisabled: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  selectedContainersSummary: PropTypes.object.isRequired,
  onButtonClick: PropTypes.func,
};
