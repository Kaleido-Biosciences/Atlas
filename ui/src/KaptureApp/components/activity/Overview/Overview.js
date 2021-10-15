import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plate } from './Plate';
import { Button } from 'KaptureApp/components';
// import { Scrollbars } from 'KaptureApp/components';
import styles from './Overview.module.css';

export class Overview extends Component {
  lastClickedPlateId = null;
  getSelectedPlateIds = () => {
    const { viewPlates } = this.props.view;
    const selectedIds = [];
    viewPlates.forEach((viewPlate) => {
      if (viewPlate.selected) {
        selectedIds.push(viewPlate.id);
      }
    });
    return selectedIds;
  };
  handleSet96Wells = () => {
    if (this.props.onSetPlateSize) {
      this.props.onSetPlateSize(this.getSelectedPlateIds(), 8, 12);
    }
  };
  handleSet384Wells = () => {
    if (this.props.onSetPlateSize) {
      this.props.onSetPlateSize(this.getSelectedPlateIds(), 16, 24);
    }
  };
  handleAddPlateEditorView = (plateId) => {
    if (this.props.onAddView) {
      this.props.onAddView('PlateEditor', [plateId]);
    }
  };
  handleAddPlateTableView = (plateId) => {
    if (this.props.onAddView) {
      this.props.onAddView('PlateTable', [plateId]);
    }
  };
  handleSelectAll = () => {
    if (this.props.onPlateSelectionChange) {
      const { view } = this.props;
      const plateSelections = [];
      view.viewPlates.forEach((viewPlate) => {
        plateSelections.push({ plateId: viewPlate.id, selected: true });
      });
      this.props.onPlateSelectionChange(view.id, plateSelections);
    }
  };
  handleDeselectAll = () => {
    if (this.props.onPlateSelectionChange) {
      const { view } = this.props;
      const plateSelections = [];
      view.viewPlates.forEach((viewPlate) => {
        plateSelections.push({ plateId: viewPlate.id, selected: false });
      });
      this.props.onPlateSelectionChange(view.id, plateSelections);
    }
  };
  handlePlateClick = (plateId, key) => {
    if (this.props.onPlateSelectionChange) {
      const { view } = this.props;
      const plateSelections = [];
      if (!key) {
        view.viewPlates.forEach((viewPlate) => {
          if (viewPlate.id === plateId) {
            plateSelections.push({ plateId: viewPlate.id, selected: true });
          } else
            plateSelections.push({ plateId: viewPlate.id, selected: false });
        });
      } else if (key === 'shift') {
        let clickedIndex = 0;
        let lastClickedIndex = 0;
        let existingSelection = false;
        view.viewPlates.forEach((viewPlate, i) => {
          if (viewPlate.id === plateId) clickedIndex = i;
          if (viewPlate.selected) existingSelection = true;
          if (viewPlate.id === this.lastClickedPlateId) lastClickedIndex = i;
        });
        if (!existingSelection) {
          view.viewPlates.forEach((viewPlate, i) => {
            if (i <= clickedIndex) {
              plateSelections.push({ plateId: viewPlate.id, selected: true });
            } else
              plateSelections.push({ plateId: viewPlate.id, selected: false });
          });
        } else {
          if (clickedIndex < lastClickedIndex) {
            view.viewPlates.forEach((viewPlate, i) => {
              if (i >= clickedIndex && i < lastClickedIndex) {
                plateSelections.push({ plateId: viewPlate.id, selected: true });
              } else
                plateSelections.push({
                  plateId: viewPlate.id,
                  selected: viewPlate.selected,
                });
            });
          } else if (clickedIndex > lastClickedIndex) {
            view.viewPlates.forEach((viewPlate, i) => {
              if (i > lastClickedIndex && i <= clickedIndex) {
                plateSelections.push({ plateId: viewPlate.id, selected: true });
              } else {
                plateSelections.push({
                  plateId: viewPlate.id,
                  selected: viewPlate.selected,
                });
              }
            });
          }
        }
      } else if (key === 'meta' || key === 'ctrl') {
        view.viewPlates.forEach((viewPlate) => {
          if (viewPlate.id === plateId) {
            plateSelections.push({
              plateId: viewPlate.id,
              selected: !viewPlate.selected,
            });
          } else
            plateSelections.push({
              plateId: viewPlate.id,
              selected: viewPlate.selected,
            });
        });
      }
      this.lastClickedPlateId = plateId;
      this.props.onPlateSelectionChange(view.id, plateSelections);
    }
  };
  renderPlates() {
    const { viewPlates } = this.props.view;
    return viewPlates.map((viewPlate, i) => {
      return (
        <Plate
          key={viewPlate.id}
          onClick={this.handlePlateClick}
          onEditorClick={this.handleAddPlateEditorView}
          onSaveName={this.props.onSavePlateName}
          onTableClick={this.handleAddPlateTableView}
          onUpdatePlateDetails={this.props.onUpdatePlateDetails}
          viewPlate={viewPlate}
          zIndex={`${viewPlates.length - i}`}
        />
      );
    });
  }
  render() {
    return (
      <div className={styles.overview}>
        <div className="h-10 bg-gray-50 pl-4 flex flex-row items-center">
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
            onClick={this.handleSet96Wells}
            content="Set as 96 Wells"
            icon="plus-circle"
            secondary
            className="mr-2"
          />
          <Button
            onClick={this.handleSet384Wells}
            content="Set as 384 Wells"
            icon="plus-circle"
            secondary
            className="mr-2"
          />
        </div>
        <div className={styles.scrollContainer}>
          {/* <Scrollbars> */}
          <div
            onClick={this.handleDeselectAll}
            className="min-h-full relative overflow-auto bg-gray-100"
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
  view: PropTypes.object.isRequired,
  onAddView: PropTypes.func,
  onPlateSelectionChange: PropTypes.func,
  onSavePlateName: PropTypes.func,
  onSetPlateSize: PropTypes.func,
};
