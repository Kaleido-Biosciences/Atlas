import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'KaptureApp/components';

import styles from './SelectedWells.module.css';

export class SelectedWells extends Component {
  handleButtonClick = () => {
    if (this.props.onButtonClick) this.props.onButtonClick();
  };
  isWellSelected() {
    const { activeView } = this.props;
    const selected = activeView.viewPlates.find((viewPlate) => {
      return viewPlate.selectedWells.length > 0;
    });
    if (selected) return true;
    else return false;
  }
  getSelectedWellCount() {
    const { activeView } = this.props;
    let selectedWellCount = 0;
    activeView.viewPlates.forEach((viewPlate) => {
      selectedWellCount += viewPlate.selectedWells.length;
    });
    return selectedWellCount;
  }
  renderSelectedWellCounts() {
    const { activeView } = this.props;
    let content = 'No wells selected';
    if (this.isWellSelected()) {
      const counts = [];
      activeView.viewPlates.forEach((viewPlate) => {
        if (viewPlate.selectedWells.length > 0) {
          counts.push(
            <div key={viewPlate.id}>
              {viewPlate.plate.name}: {viewPlate.selectedWells.length}
            </div>
          );
        }
      });
      content = counts;
    }
    return (
      <div className={styles.text}>
        <h1 className="font-bold mb-1">Selected well counts</h1>
        {content}
      </div>
    );
  }
  render() {
    const { buttonDisabled } = this.props;
    let disabled = buttonDisabled || false;
    if (!this.isWellSelected()) {
      disabled = true;
    }
    const count = this.getSelectedWellCount();
    const wellText = count === 1 ? 'well' : 'wells';
    return (
      <div className={styles.selectedWells}>
        {this.renderSelectedWellCounts()}
        {this.props.showButton && (
          <div className={styles.buttonContainer}>
            <Button disabled={disabled} onClick={this.handleButtonClick}>
              {`${this.props.buttonText} ${count} ${wellText}`}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

SelectedWells.propTypes = {
  activeView: PropTypes.object,
  buttonDisabled: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  showButton: PropTypes.bool,
};
