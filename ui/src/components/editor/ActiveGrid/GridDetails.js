import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';
import memoize from 'memoize-one';

import { Settings } from '../Settings';
import styles from './GridDetails.module.css';

export class GridDetails extends Component {
  getOptions = memoize(barcodes => {
    return barcodes.map(barcode => {
      return { key: barcode, value: barcode, text: barcode };
    });
  });
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
      barcodes,
      settings,
      onSettingsChange,
    } = this.props;
    let options = [];
    if (barcodes.length) {
      options = this.getOptions(barcodes);
    } else if (gridBarcode) {
      options = this.getOptions([gridBarcode]);
    }
    return (
      <div className={styles.gridDetails}>
        <div>
          <Icon title="Barcode" name="barcode" />
          <Dropdown
            selection
            search
            allowAdditions
            options={options}
            placeholder="Select barcode"
            onAddItem={this.handleAddition}
            onChange={this.handleChange}
            value={gridBarcode}
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
  barcodes: PropTypes.array.isRequired,
  onBarcodeAdd: PropTypes.func,
  onBarcodeSelect: PropTypes.func,
  settings: PropTypes.object,
  onSettingsChange: PropTypes.func,
};
