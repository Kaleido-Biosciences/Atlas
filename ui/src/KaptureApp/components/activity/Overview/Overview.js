import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plate } from './Plate';
import { Button } from 'KaptureApp/components';
import { PlateTypeDropdown } from '../PlateTypeDropdown';
// import { Scrollbars } from 'KaptureApp/components';
import styles from './Overview.module.css';

export class Overview extends Component {
  getSelectedPlateIds = () => {
    return this.props.plates.reduce((selectedIds, plate) => {
      if (plate.selected) selectedIds.push(plate.id);
      return selectedIds;
    }, []);
  };
  handleSetPlateType = (plateType) => {
    this.props.onSetPlateType(this.getSelectedPlateIds(), plateType);
  };
  handleViewPlateInEditor = (plateId) => {
    this.props.onSwitchToView('PlateEditor', plateId);
  };
  handleViewPlateInTable = (plateId) => {
    this.props.onSwitchToView('PlateTable', plateId);
  };
  handleSelectAll = () => {
    this.props.onPlateSelectionChange(
      this.props.plates.map((plate) => plate.id)
    );
  };
  handleDeselectAll = (e) => {
    this.props.onPlateSelectionChange([]);
  };
  handleDeselectClick = (e) => {
    if (
      e.target.nodeName === 'DIV' &&
      e.target.className.includes('plateContainer')
    ) {
      this.props.onPlateSelectionChange([]);
    }
  };
  handlePlateClick = (plateId, key) => {
    //TODO: Implement shift click similar to drag to select
    const { plates } = this.props,
      plateSelections = [];
    if (!key) {
      plateSelections.push(plateId);
    } else if (key === 'meta' || key === 'ctrl' || key === 'shift') {
      plates.forEach((plate) => {
        if (
          (plate.id === plateId && !plate.selected) ||
          (plate.id !== plateId && plate.selected)
        ) {
          plateSelections.push(plate.id);
        }
      });
    }
    this.props.onPlateSelectionChange(plateSelections);
  };
  handleKeyDown = (e) => {
    const selectedIds = this.getSelectedPlateIds();
    if (e.keyCode === 67 && (e.metaKey || e.ctrlKey)) {
      let plateIdToCopy = null;
      if (selectedIds.length === 1) {
        const plate = this.props.plates.find(
          (plate) => plate.id === selectedIds[0]
        );
        if (plate.plateType) plateIdToCopy = plate.id;
      }
      this.props.onCopyPlate(plateIdToCopy);
    }
    if (e.keyCode === 86 && (e.metaKey || e.ctrlKey)) {
      if (selectedIds.length) {
        this.props.onPastePlate(selectedIds);
      }
    }
  };
  handleAutoArrangePlates = () => {
    this.props.onAutoArrangePlates();
  };
  renderPlates() {
    const { plates } = this.props;
    return plates.map((plate, i) => {
      return (
        <Plate
          key={plate.id}
          onClick={this.handlePlateClick}
          onSaveName={this.props.onSavePlateName}
          onUpdatePlateDetails={this.props.onUpdatePlateDetails}
          onViewInEditor={this.handleViewPlateInEditor}
          onViewInTable={this.handleViewPlateInTable}
          plate={plate}
          zIndex={`${plates.length - i}`}
        />
      );
    });
  }
  render() {
    return (
      <div
        className={`${styles.overview} focus:outline-none`}
        onKeyDown={this.handleKeyDown}
        tabIndex="1"
      >
        <div className="px-3 py-2 bg-gray-50  flex flex-row items-center">
          <Button
            onClick={this.handleSelectAll}
            content="Select All"
            icon="check-square"
            secondary
            className="mr-2"
          />
          <Button
            onClick={this.handleDeselectAll}
            content="Deselect All"
            icon={['far', 'square']}
            secondary
            className="mr-2"
          />
          <Button
            onClick={this.handleAutoArrangePlates}
            content="Auto Arrange"
            secondary
            className="mr-2"
          />
          <PlateTypeDropdown
            onSelect={this.handleSetPlateType}
            plateTypes={this.props.plateTypes}
          />
        </div>
        <div className={styles.scrollContainer}>
          {/* <Scrollbars> */}
          <div
            onClick={this.handleDeselectClick}
            className="plateContainer min-h-full relative overflow-auto bg-gray-100"
          >
            {this.renderPlates()}
          </div>
          {/* </Scrollbars> */}
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  onAutoArrangePlates: PropTypes.func.isRequired,
  onCopyPlate: PropTypes.func.isRequired,
  onPastePlate: PropTypes.func.isRequired,
  onPlateSelectionChange: PropTypes.func.isRequired,
  onSavePlateName: PropTypes.func.isRequired,
  onSwitchToView: PropTypes.func,
  plates: PropTypes.array.isRequired,
  plateTypes: PropTypes.array.isRequired,
  view: PropTypes.object,
};
