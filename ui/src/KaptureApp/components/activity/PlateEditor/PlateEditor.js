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
  render() {
    const viewPlate = this.props.view.viewPlates[0];
    return (
      <div className={styles.editor}>
        <Header plate={viewPlate.plate} onSaveName={this.props.onSaveName} />
        <div className={styles.gridContainer}>
          <PlateGrid
            enableRemoveComponent={this.props.enableRemoveComponent}
            plate={viewPlate.plate}
            onClick={this.handleGridClick}
            onRemoveComponent={this.props.onRemoveComponent}
            selectedWells={viewPlate.selectedWells}
          />
        </div>
      </div>
    );
  }
}

PlateEditor.propTypes = {
  enableRemoveComponent: PropTypes.bool,
  onGridClick: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  onSaveName: PropTypes.func,
  view: PropTypes.object,
};
