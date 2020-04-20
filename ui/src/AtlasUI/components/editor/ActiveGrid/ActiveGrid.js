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
      containerTypeOptions,
      onAddContainer,
      barcodeOptions,
      onBarcodeAdd,
      onBarcodeSelect,
      settings,
      onSettingsChange,
      headerSize,
      rowHeaders,
    } = this.props;
    if (activeGrid) {
      return (
        <div className={styles.activeGrid}>
          <div>
            <GridDetails
              gridId={activeGrid.id}
              gridBarcode={activeGrid.barcode}
              barcodeOptions={barcodeOptions}
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
              onClick={onContainerClick}
              containerTypeOptions={containerTypeOptions}
              onAddContainer={onAddContainer}
              headerSize={headerSize}
              rowHeaders={rowHeaders}
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
  containerTypeOptions: PropTypes.array,
  onAddContainer: PropTypes.func,
  barcodeOptions: PropTypes.array.isRequired,
  onBarcodeSelect: PropTypes.func,
  onBarcodeAdd: PropTypes.func,
  settings: PropTypes.object.isRequired,
  onSettingsChange: PropTypes.func,
  headerSize: PropTypes.number.isRequired,
  rowHeaders: PropTypes.array.isRequired,
};
