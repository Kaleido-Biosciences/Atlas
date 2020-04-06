import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GridDetails } from './GridDetails';
import { Grid } from '../Grid';
import styles from './ActiveGrid.module.css';

export class ActiveGrid extends Component {
  render() {
    const {
      activeGrid,
      onContainerClick,
      onAddContainer,
      barcodes,
      onBarcodeAdd,
      onBarcodeSelect,
      settings,
      onSettingsChange,
    } = this.props;
    if (activeGrid) {
      return (
        <div className={styles.activeGrid}>
          <div>
            <GridDetails
              gridId={activeGrid.id}
              gridBarcode={activeGrid.barcode}
              barcodes={barcodes}
              onBarcodeAdd={onBarcodeAdd}
              onBarcodeSelect={onBarcodeSelect}
              settings={settings}
              onSettingsChange={onSettingsChange}
            />
          </div>
          <div className={styles.gridContainer}>
            <Grid
              grid={activeGrid}
              settings={settings}
              onAddContainer={onAddContainer}
              onClick={onContainerClick}
            />
          </div>
        </div>
      );
    } else {
      return <div>No active container</div>;
    }
  }
}

ActiveGrid.propTypes = {
  activeGrid: PropTypes.object,
  onContainerClick: PropTypes.func,
  onAddContainer: PropTypes.func,
  barcodes: PropTypes.array.isRequired,
  onBarcodeSelect: PropTypes.func,
  onBarcodeAdd: PropTypes.func,
  settings: PropTypes.object.isRequired,
  onSettingsChange: PropTypes.func,
};
