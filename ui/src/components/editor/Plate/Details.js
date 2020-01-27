import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';
import memoize from 'memoize-one';

import styles from './Plate.module.css';

export class Details extends Component {
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
        plateId: this.props.plate.id,
        barcode: value,
      });
    }
  };
  render() {
    const { plate, barcodes } = this.props;
    let options = [];
    if (barcodes.length) {
      options = this.getOptions(barcodes);
    } else if (plate.barcode) {
      options = this.getOptions([plate.barcode]);
    }
    return (
      <div className={styles.details}>
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
            value={plate.barcode}
          />
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  plate: PropTypes.object.isRequired,
  barcodes: PropTypes.array.isRequired,
  onBarcodeAdd: PropTypes.func,
  onBarcodeSelect: PropTypes.func,
};
