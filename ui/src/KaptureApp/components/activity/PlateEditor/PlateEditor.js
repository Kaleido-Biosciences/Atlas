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
    const plate = this.props.plates.find((plate) => plate.selected);
    return (
      <div className={styles.editor}>
        <Header plate={plate} onSaveName={this.props.onSaveName} />
        <div className={styles.gridContainer}>
          <PlateGrid
            enableRemoveComponent={this.props.enableRemoveComponent}
            plate={plate}
            onClick={this.handleGridClick}
            onRemoveComponent={this.props.onRemoveComponent}
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
  plates: PropTypes.array,
  view: PropTypes.object,
};
