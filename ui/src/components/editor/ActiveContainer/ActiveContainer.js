import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Details } from './Details';
import { Settings } from './Settings';
import { ColumnHeader } from './ColumnHeader';

import styles from './ActiveContainer.module.css';

export class ActiveContainer extends Component {
  render() {
    const {
      activeContainer,
      barcodes,
      onBarcodeAdd,
      onBarcodeSelect,
      settings,
      onSettingsChange,
    } = this.props;
    let content = 'hi';
    if (activeContainer) {
      return (
        <div className={styles.activeContainer}>
          <div>
            <Details
              containerId={activeContainer.id}
              containerBarcode={activeContainer.barcode}
              barcodes={barcodes}
              onBarcodeAdd={onBarcodeAdd}
              onBarcodeSelect={onBarcodeSelect}
            />
          </div>
          <div className={styles.topHeader}>
            <div className={styles.cornerCell}>
              <Settings settings={settings} onChange={onSettingsChange} />
            </div>
            <ColumnHeader
              ref={this.columnHeaderRef}
              numberOfColumns={activeContainer.grid[0].length}
              containerSize={settings.containerSize}
            />
          </div>
        </div>
      );
    } else return <div />;
  }
}

ActiveContainer.propTypes = {
  activeContainer: PropTypes.object,
  settings: PropTypes.object.isRequired,
  barcodes: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onSettingsChange: PropTypes.func,
  onBarcodeAdd: PropTypes.func,
  onBarcodeSelect: PropTypes.func,
};
