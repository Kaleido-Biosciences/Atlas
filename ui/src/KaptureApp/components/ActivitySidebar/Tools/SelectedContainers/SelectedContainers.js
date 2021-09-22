import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../Button';

import styles from './SelectedContainers.module.css';

export class SelectedContainers extends Component {
  handleButtonClick = () => {
    if (this.props.onButtonClick) this.props.onButtonClick();
  };
  isContainerSelected() {
    const { activeView } = this.props;
    const gridWithSelected = activeView.data.viewGrids.find((viewGrid) => {
      return viewGrid.selectedContainers.length > 0;
    });
    if (gridWithSelected) return true;
    else return false;
  }
  getSelectedContainerCount() {
    const { activeView } = this.props;
    let selectedContainerCount = 0;
    activeView.data.viewGrids.forEach((viewGrid) => {
      selectedContainerCount += viewGrid.selectedContainers.length;
    });
    return selectedContainerCount;
  }
  renderSelectedContainerCounts() {
    const { activeView } = this.props;
    let content = 'No containers selected';
    if (this.isContainerSelected()) {
      const counts = [];
      activeView.data.viewGrids.forEach((viewGrid) => {
        if (viewGrid.selectedContainers.length > 0) {
          counts.push(
            <div key={viewGrid.id}>
              {viewGrid.grid.name}: {viewGrid.selectedContainers.length}
            </div>
          );
        }
      });
      content = counts;
    }
    return (
      <div className={styles.text}>
        <h1 className="font-bold mb-1">Selected container counts</h1>
        {content}
      </div>
    );
  }
  render() {
    const { buttonDisabled } = this.props;
    let disabled = buttonDisabled || false;
    if (!this.isContainerSelected()) {
      disabled = true;
    }
    const count = this.getSelectedContainerCount();
    const containerText = count === 1 ? 'container' : 'containers';
    return (
      <div className={styles.selectedContainers}>
        {this.renderSelectedContainerCounts()}
        {this.props.showButton && (
          <div className={styles.buttonContainer}>
            <Button disabled={disabled} onClick={this.handleButtonClick}>
              {`${this.props.buttonText} ${count} ${containerText}`}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

SelectedContainers.propTypes = {
  activeView: PropTypes.object,
  buttonDisabled: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  showButton: PropTypes.bool,
};
