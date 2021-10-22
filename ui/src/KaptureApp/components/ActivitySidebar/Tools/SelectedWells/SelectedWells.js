import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'KaptureApp/components';

import styles from './SelectedWells.module.css';

export class SelectedWells extends Component {
  handleButtonClick = () => {
    if (this.props.onButtonClick) this.props.onButtonClick();
  };
  getSelectedWellSummary() {
    const { plates } = this.props;
    let isWellSelected = false,
      selectedWellCount = 0,
      plateCounts = [];
    plates.forEach((plate) => {
      let plateCount = 0;
      if (plate.wells && plate.wells.length > 0) {
        plate.wells.forEach((well) => {
          if (well.selected) plateCount++;
        });
      }
      if (plateCount) {
        selectedWellCount += plateCount;
        plateCounts.push({
          name: plate.name,
          count: plateCount,
        });
      }
      if (!isWellSelected && plateCount) isWellSelected = true;
    });
    return {
      isWellSelected,
      selectedWellCount,
      plateCounts,
    };
  }
  renderSelectedWellCounts(summary) {
    let content = 'No wells selected';
    if (summary.isWellSelected) {
      let counts = [];
      summary.plateCounts.forEach((plateCount) => {
        counts.push(
          <div key={plateCount.name}>
            {plateCount.name}: {plateCount.count}
          </div>
        );
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
    const summary = this.getSelectedWellSummary();
    let disabled = buttonDisabled || false;
    if (!summary.isWellSelected) {
      disabled = true;
    }
    const count = summary.selectedWellCount;
    const wellText = count === 1 ? 'well' : 'wells';
    return (
      <div className={styles.selectedWells}>
        {this.renderSelectedWellCounts(summary)}
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
  plates: PropTypes.array,
  showButton: PropTypes.bool,
};

// isWellSelected() {
//   const { activeView } = this.props;
//   const selected = activeView.viewPlates.find((viewPlate) => {
//     return viewPlate.selectedWells.length > 0;
//   });
//   if (selected) return true;
//   else return false;
// }

// getSelectedWellCount() {
//   const { activeView } = this.props;
//   let selectedWellCount = 0;
//   activeView.viewPlates.forEach((viewPlate) => {
//     selectedWellCount += viewPlate.selectedWells.length;
//   });
//   return selectedWellCount;
// }
// renderSelectedWellCounts() {
//   const { activeView } = this.props;
//   let content = 'No wells selected';
//   if (this.isWellSelected()) {
//     const counts = [];
//     activeView.viewPlates.forEach((viewPlate) => {
//       if (viewPlate.selectedWells.length > 0) {
//         counts.push(
//           <div key={viewPlate.id}>
//             {viewPlate.plate.name}: {viewPlate.selectedWells.length}
//           </div>
//         );
//       }
//     });
//     content = counts;
//   }
//   return (
//     <div className={styles.text}>
//       <h1 className="font-bold mb-1">Selected well counts</h1>
//       {content}
//     </div>
//   );
// }
