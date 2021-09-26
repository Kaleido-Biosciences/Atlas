import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plate } from './Plate';
import { Button } from 'KaptureApp/components';
import { Scrollbars } from 'AtlasUI/components';
import styles from './Overview.module.css';

export class Overview extends Component {
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
  handleAddEditorView = (plateId) => {
    if (this.props.onAddView) {
      this.props.onAddView('Editor', [plateId]);
    }
  };
  handleAddPlateTableView = (plateId) => {
    if (this.props.onAddView) {
      this.props.onAddView('PlateTable', [plateId]);
    }
  };
  handlePlateCheckboxChange = (plateId) => {
    if (this.props.onTogglePlateSelection) {
      this.props.onTogglePlateSelection(plateId, this.props.view.id);
    }
  };
  handleSelectAll = () => {
    if (this.props.onSelectAll) {
      this.props.onSelectAll(this.props.view.id, true);
    }
  };
  handleDeselectAll = () => {
    if (this.props.onDeselectAll) {
      this.props.onDeselectAll(this.props.view.id, false);
    }
  };
  renderPlates() {
    const { viewPlates } = this.props.view;
    return viewPlates.map((viewPlate) => {
      return (
        <Plate
          key={viewPlate.id}
          viewPlate={viewPlate}
          onCheckboxChange={this.handlePlateCheckboxChange}
          onEditorClick={this.handleAddEditorView}
          onSaveName={this.props.onSavePlateName}
          onTableClick={this.handleAddPlateTableView}
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
          <Scrollbars>
            <div className="flex flex-row flex-wrap content-start p-4 bg-gray-100">
              {this.renderPlates()}
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  view: PropTypes.object.isRequired,
  onAddView: PropTypes.func,
  onDeselectAll: PropTypes.func,
  onSavePlateName: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSetPlateSize: PropTypes.func,
  onTogglePlateSelection: PropTypes.func,
};
