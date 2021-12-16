import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Plate } from './Plate';
import { Button, IconButton } from 'ui';
import { PlateTypeDropdown } from '../PlateTypeDropdown';
import { ImportPlatesDialog } from '../ImportPlatesDialog';
import styles from './Overview.module.css';

export class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platePositions: {},
      dragging: false,
      importPlatesDialogOpen: false,
    };
  }
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
      const plateTypeSettings = this.props.selectedPlateIds.map((plateId) => {
        return {
          id: plateId,
          plateTypeId: plateType.id,
        };
      });
      this.props.onSetPlateType(plateTypeSettings);
    }
  };
  handlePlateClick = (plateId, key) => {
    //TODO: Implement shift click similar to drag to select
    const { plates } = this.props,
      plateSelections = [];
    if (!key) {
      if (!this.props.selectedPlateIds.includes(plateId)) {
        plateSelections.push(plateId);
        this.props.onPlateSelectionChange(plateSelections);
      }
    } else if (key === 'meta' || key === 'ctrl' || key === 'shift') {
      plates.forEach((plate) => {
        if (
          (plate.id === plateId && !plate.selected) ||
          (plate.id !== plateId && plate.selected)
        ) {
          plateSelections.push(plate.id);
        }
      });
      this.props.onPlateSelectionChange(plateSelections);
    }
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
  handlePlateDragStart = () => {
    const platePositions = {};
    this.props.plates.forEach((plate) => {
      platePositions[plate.id] = {
        x: plate.overviewPositionLeft,
        y: plate.overviewPositionTop,
      };
    });
    this.setState({
      platePositions,
      dragging: true,
    });
  };
  handlePlateDrag = (e, data) => {
    const platePositions = {
      ...this.state.platePositions,
    };
    this.props.selectedPlateIds.forEach((id) => {
      platePositions[id].x += data.deltaX;
      platePositions[id].y += data.deltaY;
    });
    this.setState({
      platePositions,
    });
  };
  handlePlateDragStop = (positionChanged) => {
    if (positionChanged) {
      const plateProperties = [];
      for (let i in this.state.platePositions) {
        plateProperties.push({
          id: parseInt(i),
          overviewPositionLeft: this.state.platePositions[i].x,
          overviewPositionTop: this.state.platePositions[i].y,
        });
      }
      this.props.onPlateDragStop(plateProperties);
    }
    this.setState({
      platePositions: {},
      dragging: false,
    });
  };
  handleOpenImportPlatesDialog = () => {
    this.setState({
      importPlatesDialogOpen: true,
    });
  };
  handleCloseImportPlatesDialog = () => {
    this.setState({
      importPlatesDialogOpen: false,
    });
    this.props.onImportModalClose();
  };
  renderPlates() {
    const { plates } = this.props;
    return plates.map((plate, i) => {
      const position = this.state.dragging
        ? this.state.platePositions[plate.id]
        : {
            x: plate.overviewPositionLeft,
            y: plate.overviewPositionTop,
          };
      return (
        <Plate
          key={plate.id}
          onClick={this.handlePlateClick}
          onDrag={this.handlePlateDrag}
          onDragStart={this.handlePlateDragStart}
          onDragStop={this.handlePlateDragStop}
          onSaveName={this.props.onSavePlateName}
          onUpdatePlateDetails={this.props.onUpdatePlateDetails}
          onViewInEditor={this.handleViewPlateInEditor}
          onViewInTable={this.handleViewPlateInTable}
          plate={plate}
          position={position}
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
        <ImportPlatesDialog
          onClose={this.handleCloseImportPlatesDialog}
          open={this.state.importPlatesDialogOpen}
        />
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
            className={iconButtonClasses}
            icon="exchange-alt"
            onClick={this.handleSwapComponents}
            tooltip="Swap Components"
            disabled={this.props.swapComponentsDisabled}
          />
          <IconButton
            className={classNames(iconButtonClasses, 'mr-2')}
            icon="file-import"
            onClick={this.handleOpenImportPlatesDialog}
            tooltip="Import Plates"
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
  onImportModalClose: PropTypes.func.isRequired,
  onPastePlate: PropTypes.func.isRequired,
  onPlateDragStop: PropTypes.func.isRequired,
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
