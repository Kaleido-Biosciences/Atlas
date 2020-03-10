import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ContainerDetails } from './ContainerDetails';
import { ContainerGrid } from '../ContainerGrid';
import { Container } from '../Container';
import styles from './ActiveContainer.module.css';

export class ActiveContainer extends Component {
  renderContainerGrid(containerGrid) {
    const { settings, onSettingsChange } = this.props;
    return (
      <ContainerGrid
        containerGrid={containerGrid}
        settings={settings}
        onSettingsChange={onSettingsChange}
      />
    );
  }
  renderContainer(container) {
    return <Container container={container} />;
  }
  render() {
    const {
      activeContainer,
      barcodes,
      onBarcodeAdd,
      onBarcodeSelect,
    } = this.props;
    if (activeContainer) {
      return (
        <div className={styles.activeContainer}>
          <div>
            <ContainerDetails
              containerId={activeContainer.id}
              containerBarcode={activeContainer.barcode}
              barcodes={barcodes}
              onBarcodeAdd={onBarcodeAdd}
              onBarcodeSelect={onBarcodeSelect}
            />
          </div>
          <div className={styles.bodyContainer}>
            {activeContainer.type === 'ContainerGrid'
              ? this.renderContainerGrid(activeContainer)
              : this.renderContainer(activeContainer)}
          </div>
        </div>
      );
    } else {
      return <div>No active container</div>;
    }
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
