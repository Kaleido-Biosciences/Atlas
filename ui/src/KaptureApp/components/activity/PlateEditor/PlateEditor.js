import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlateGrid } from './PlateGrid';
import { Header } from './Header';
import styles from './PlateEditor.module.css';

export class PlateEditor extends Component {
  handleGridClick = (wells, plates) => {
    if (this.props.onGridClick) {
      this.props.onGridClick(wells, plates, this.props.view.id);
    }
  };
  handlePlateChange = (plateId) => {
    this.props.onPlateChange([plateId]);
  };
  handleSizeChange = (size) => {
    this.props.onUpdateViewData(this.props.view.id, {
      selectedSizeOption: size,
    });
  };
  render() {
    const plate = this.props.plates.find((plate) => plate.selected);
    const viewData = this.props.view.data;
    const selectedSizeOption = viewData.sizeOptions.find(
      (option) => option.name === viewData.selectedSizeOption
    );
    return (
      <div className={styles.editor}>
        <Header
          onPlateChange={this.handlePlateChange}
          onSaveName={this.props.onSaveName}
          onSizeChange={this.handleSizeChange}
          plates={this.props.plates}
          selectedSizeOption={viewData.selectedSizeOption}
          sizeOptions={viewData.sizeOptions}
        />
        <div className={styles.gridContainer}>
          {plate ? (
            <PlateGrid
              enableRemoveComponent={this.props.enableRemoveComponent}
              plate={plate}
              onClick={this.handleGridClick}
              onRemoveComponent={this.props.onRemoveComponent}
              settings={selectedSizeOption.settings}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

PlateEditor.propTypes = {
  enableRemoveComponent: PropTypes.bool,
  onGridClick: PropTypes.func,
  onPlateChange: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  onSaveName: PropTypes.func,
  onUpdateViewData: PropTypes.func,
  plates: PropTypes.array,
  view: PropTypes.object,
};
