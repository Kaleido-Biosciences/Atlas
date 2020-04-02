import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';
import memoize from 'memoize-one';

import { Settings } from '../Settings';
import styles from './ContainerDetails.module.css';

export class ContainerDetails extends Component {
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
        containerId: this.props.containerId,
        barcode: value,
      });
    }
  };
  render() {
    const {
      containerBarcode,
      barcodes,
      settings,
      onSettingsChange,
    } = this.props;
    let options = [];
    if (barcodes.length) {
      options = this.getOptions(barcodes);
    } else if (containerBarcode) {
      options = this.getOptions([containerBarcode]);
    }
    return (
      <div className={styles.containerDetails}>
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
            value={containerBarcode}
          />
        </div>
        <div className={styles.settings}>
          <Settings settings={settings} onChange={onSettingsChange} />
        </div>
      </div>
    );
  }
}

ContainerDetails.propTypes = {
  containerId: PropTypes.string,
  containerBarcode: PropTypes.string,
  barcodes: PropTypes.array.isRequired,
  onBarcodeAdd: PropTypes.func,
  onBarcodeSelect: PropTypes.func,
  settings: PropTypes.object,
  onSettingsChange: PropTypes.func,
};
