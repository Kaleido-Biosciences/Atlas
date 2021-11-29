import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Plate } from './Plate';
import { Button, IconButton } from 'ui';
import { PlateTypeDropdown } from '../PlateTypeDropdown';
import styles from './Overview.module.css';

export class Overview extends Component {
  handleSelectAll = () => {
    this.props.onPlateSelectionChange(
      this.props.plates.map((plate) => plate.id)
    );
  };
  handleDeselectAll = (e) => {
    this.props.onPlateSelectionChange([]);
  };
  handleCopyPlate = () => {
    if (!this.props.copyPlateDisabled) {
      this.props.onCopyPlate(this.props.selectedPlateIds[0]);
    }
  };
  handlePastePlate = () => {
    if (!this.props.pastePlateDisabled) {
      this.props.onPastePlate(this.props.selectedPlateIds);
    }
  };
  handleSwapComponents = () => {
    if (!this.props.swapComponentsDisabled) {
      this.props.onSwapComponents(this.props.selectedPlateIds);
    }
  };
  handleAutoArrangePlates = () => {
    this.props.onAutoArrangePlates();
  };
  handleSetPlateType = (plateType) => {
    if (this.props.selectedPlateIds.length > 0) {
      this.props.onSetPlateType(this.props.selectedPlateIds, plateType);
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
  handleDeselectClick = (e) => {
    if (
      e.target.nodeName === 'DIV' &&
      e.target.className.includes('plateContainer')
    ) {
      this.props.onPlateSelectionChange([]);
    }
  };
  handleViewPlateInEditor = (plateId) => {
    this.props.onSwitchToView('PlateEditor', plateId);
  };
  handleViewPlateInTable = (plateId) => {
    this.props.onSwitchToView('PlateTable', plateId);
  };
  handleKeyDown = (e) => {
    if (e.keyCode === 67 && (e.metaKey || e.ctrlKey)) {
      this.handleCopyPlate();
    }
    if (e.keyCode === 86 && (e.metaKey || e.ctrlKey)) {
      this.handlePastePlate();
    }
  };
  handleCloseSetPlateTypeError = () => {
    this.props.onCloseSetPlateTypeError();
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
  renderSetPlateTypeError() {
    return (
      <div
        className={
          styles.setPlateTypeError + ' rounded-md bg-red-600 p-4 text-white'
        }
      >
        <div className="flex">
          <div className="flex-grow">
            <div className="text-xs">
              An error occurred while setting the plate type
            </div>
            <div>{this.props.setPlateTypeError}</div>
          </div>
          <div className="flex items-center justify-center">
            <FontAwesomeIcon
              className="cursor-pointer"
              icon="times"
              onClick={this.handleCloseSetPlateTypeError}
            />
          </div>
        </div>
      </div>
    );
  }
  render() {
    const iconButtonClasses = 'w-8 h-8';
    return (
      <div
        className={`${styles.overview} focus:outline-none`}
        onKeyDown={this.handleKeyDown}
        tabIndex="1"
      >
        <div className="px-3 py-2 bg-gray-50  flex flex-row items-center">
          <IconButton
            className={iconButtonClasses}
            icon="check-square"
            onClick={this.handleSelectAll}
            tooltip="Select All"
          />
          <IconButton
            className={iconButtonClasses}
            icon={['far', 'square']}
            onClick={this.handleDeselectAll}
            tooltip="Deselect All"
          />
          <IconButton
            className={iconButtonClasses}
            icon="clipboard"
            onClick={this.handleCopyPlate}
            tooltip="Copy Plate"
            disabled={this.props.copyPlateDisabled}
          />
          <IconButton
            className={iconButtonClasses}
            icon="paste"
            onClick={this.handlePastePlate}
            tooltip="Paste Plate"
            disabled={this.props.pastePlateDisabled}
          />
          <IconButton
            className={classNames(iconButtonClasses, 'mr-2')}
            icon="exchange-alt"
            onClick={this.handleSwapComponents}
            tooltip="Swap Components"
            disabled={this.props.swapComponentsDisabled}
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
          <div
            onClick={this.handleDeselectClick}
            className="plateContainer min-h-full relative overflow-auto bg-gray-100"
          >
            {this.props.setPlateTypeError
              ? this.renderSetPlateTypeError()
              : null}
            {this.renderPlates()}
          </div>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  copyPlateDisabled: PropTypes.bool,
  onAutoArrangePlates: PropTypes.func.isRequired,
  onCloseSetPlateTypeError: PropTypes.func.isRequired,
  onCopyPlate: PropTypes.func.isRequired,
  onPastePlate: PropTypes.func.isRequired,
  onPlateSelectionChange: PropTypes.func.isRequired,
  onSavePlateName: PropTypes.func.isRequired,
  onSetPlateType: PropTypes.func.isRequired,
  onSwapComponents: PropTypes.func.isRequired,
  onSwitchToView: PropTypes.func,
  pastePlateDisabled: PropTypes.bool,
  plates: PropTypes.array.isRequired,
  plateTypes: PropTypes.array.isRequired,
  selectedPlateIds: PropTypes.array,
  setPlateTypeError: PropTypes.string,
  swapComponentsDisabled: PropTypes.bool,
  view: PropTypes.object,
};
