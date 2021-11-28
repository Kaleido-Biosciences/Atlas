import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Plate } from './Plate';
import { Button, IconButton } from 'ui';
import { PlateTypeDropdown } from '../PlateTypeDropdown';
import styles from './Overview.module.css';

export class Overview extends Component {
  getSelectedPlateIds = () => {
    return this.props.plates.reduce((selectedIds, plate) => {
      if (plate.selected) selectedIds.push(plate.id);
      return selectedIds;
    }, []);
  };
  getSelectedPlates = () => {
    return this.props.plates.filter((plate) => plate.selected);
  };
  handleSetPlateType = (plateType) => {
    const selectedPlateIds = this.getSelectedPlateIds();
    if (selectedPlateIds.length > 0) {
      this.props.onSetPlateType(this.getSelectedPlateIds(), plateType);
    }
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
      this.handleCopyPlate();
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
  handleCloseSetPlateTypeError = () => {
    this.props.onCloseSetPlateTypeError();
  };
  handleCopyPlate = () => {
    let plateIdToCopy = null;
    const selectedPlates = this.getSelectedPlates();
    if (selectedPlates.length === 1 && selectedPlates[0].plateType) {
      plateIdToCopy = selectedPlates[0].id;
    }
    this.props.onCopyPlate(plateIdToCopy);
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
    let copyDisabled = true;
    const selectedPlates = this.getSelectedPlates();
    if (selectedPlates.length === 1 && selectedPlates[0].plateType) {
      copyDisabled = false;
    }
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
            tooltip="Copy"
            disabled={copyDisabled}
          />
          <IconButton
            className={iconButtonClasses}
            icon="paste"
            tooltip="Paste"
          />
          <IconButton
            className={classNames(iconButtonClasses, 'mr-2')}
            icon="exchange-alt"
            tooltip="Swap"
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
  onAutoArrangePlates: PropTypes.func.isRequired,
  onCloseSetPlateTypeError: PropTypes.func.isRequired,
  onCopyPlate: PropTypes.func.isRequired,
  onPastePlate: PropTypes.func.isRequired,
  onPlateSelectionChange: PropTypes.func.isRequired,
  onSavePlateName: PropTypes.func.isRequired,
  onSetPlateType: PropTypes.func.isRequired,
  onSwitchToView: PropTypes.func,
  plates: PropTypes.array.isRequired,
  plateTypes: PropTypes.array.isRequired,
  setPlateTypeError: PropTypes.string,
  view: PropTypes.object,
};
