import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlateGrid } from './PlateGrid';
import { Header } from './Header';
import styles from './Editor.module.css';

export class Editor extends Component {
  handleGridClick = (plateId, wells) => {
    if (this.props.onGridClick) {
      this.props.onGridClick(plateId, wells, this.props.view.id);
    }
  };
  render() {
    const viewPlate = this.props.view.viewPlates[0];
    return (
      <div className={styles.editor}>
        <Header plate={viewPlate.plate} />
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

Editor.propTypes = {
  onGridClick: PropTypes.func,
  view: PropTypes.object,
};
