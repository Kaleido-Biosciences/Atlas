import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlateGrid } from './PlateGrid';
import { Header } from './Header';
import styles from './PlateEditor.module.css';

export class PlateEditor extends Component {
  handleGridClick = (plateId, wells) => {
    if (this.props.onGridClick) {
      this.props.onGridClick(plateId, wells, this.props.view.id);
    }
  };
  render() {
    const viewPlate = this.props.view.viewPlates[0];
    return (
      <div className={styles.editor}>
        <Header plate={viewPlate.plate} onSaveName={this.props.onSaveName} />
        <div className={styles.gridContainer}>
          <PlateGrid
            plate={viewPlate.plate}
            onClick={this.handleGridClick}
            selectedWells={viewPlate.selectedWells}
          />
        </div>
      </div>
    );
  }
}

PlateEditor.propTypes = {
  onGridClick: PropTypes.func,
  onSaveName: PropTypes.func,
  view: PropTypes.object,
};
