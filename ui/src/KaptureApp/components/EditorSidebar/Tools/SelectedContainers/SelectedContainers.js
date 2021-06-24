import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';

import styles from './SelectedContainers.module.css';

export class SelectedContainers extends Component {
  handleButtonClick = () => {
    if (this.props.onButtonClick) this.props.onButtonClick();
  };
  renderSelectedContainersSummary() {
    const count = this.props.selectedContainersSummary.count;
    let headerText;
    if (count > 0) {
      headerText = `${count} Selected ${
        count === 1 ? 'Container' : 'Containers'
      }`;
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
        {this.props.showButton && (
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
        )}
      </div>
    );
  }
}

SelectedContainers.propTypes = {
  buttonDisabled: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  selectedContainersSummary: PropTypes.object.isRequired,
  showButton: PropTypes.bool,
};
