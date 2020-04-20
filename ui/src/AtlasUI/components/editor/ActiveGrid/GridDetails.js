import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';

import { Settings } from '../Settings';
import styles from './GridDetails.module.css';

export class GridDetails extends Component {
  handleAddition = (e, { value }) => {
    if (this.props.onBarcodeAdd) {
      this.props.onBarcodeAdd({ barcodes: [value] });
    }
  };
  handleChange = (e, { value }) => {
    if (this.props.onBarcodeSelect) {
      this.props.onBarcodeSelect({
        gridId: this.props.gridId,
        barcode: value,
      });
    }
  };
  render() {
    const {
      gridBarcode,
      barcodeOptions,
      settings,
      onSettingsChange,
    } = this.props;
    return (
      <div className={styles.gridDetails}>
        <div>
          <Icon title="Barcode" name="barcode" />
          <Dropdown
            selection
            search
            allowAdditions
            options={barcodeOptions}
            placeholder="Select barcode"
            onAddItem={this.handleAddition}
            onChange={this.handleChange}
            value={gridBarcode}
            selectOnBlur={false}
          />
        </div>
        <div className={styles.settings}>
          <Settings settings={settings} onChange={onSettingsChange} />
        </div>
      </div>
    );
  }
}

GridDetails.propTypes = {
  gridId: PropTypes.string,
  gridBarcode: PropTypes.string,
  barcodeOptions: PropTypes.array.isRequired,
  onBarcodeAdd: PropTypes.func,
  onBarcodeSelect: PropTypes.func,
  settings: PropTypes.object,
  onSettingsChange: PropTypes.func,
};
