import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from './Grid';
import { Button } from 'KaptureApp/components';
import { Scrollbars } from 'AtlasUI/components';
import styles from './Overview.module.css';

export class Overview extends Component {
  getSelectedGridIds = () => {
    const { viewGrids } = this.props.view.data;
    const selectedIds = [];
    viewGrids.forEach((viewGrid) => {
      if (viewGrid.selected) {
        selectedIds.push(viewGrid.id);
      }
    });
    return selectedIds;
  };
  handleSet96Wells = () => {
    if (this.props.onSetGridSize) {
      this.props.onSetGridSize(this.getSelectedGridIds(), 8, 12);
    }
  };
  handleSet384Wells = () => {
    if (this.props.onSetGridSize) {
      this.props.onSetGridSize(this.getSelectedGridIds(), 16, 24);
    }
  };
  handleAddMultiTableView = () => {
    if (this.props.onAddView) {
      const gridIds = this.props.view.data.grids.map((grid) => grid.id);
      this.props.onAddView({
        type: 'MultiPlateTable',
        data: {
          gridIds,
        },
      });
    }
  };
  handleGridClick = (gridId) => {
    // if (this.props.onAddView) {
    //   this.props.onAddView({
    //     type: 'Editor',
    //     data: {
    //       gridIds: [gridId],
    //     },
    //   });
    // }
  };
  handleGridCheckboxChange = (gridId) => {
    if (this.props.onToggleGridSelection) {
      this.props.onToggleGridSelection(gridId, this.props.view.id);
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
  renderGrids() {
    const { viewGrids } = this.props.view.data;
    return viewGrids.map((viewGrid) => {
      return (
        <Grid
          key={viewGrid.id}
          viewGrid={viewGrid}
          onCheckboxChange={this.handleGridCheckboxChange}
          onClick={this.handleGridClick}
          onSaveName={this.props.onSaveGridName}
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
              {this.renderGrids()}
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  view: PropTypes.object.isRequired,
  onAddPlate: PropTypes.func,
  onAddView: PropTypes.func,
  onDeselectAll: PropTypes.func,
  onSaveGridName: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSetGridSize: PropTypes.func,
  onToggleGridSelection: PropTypes.func,
};
