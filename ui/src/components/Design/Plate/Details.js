import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Dropdown } from 'semantic-ui-react';
import memoize from 'memoize-one';

import { addBarcodes, setBarcode } from '../../../store/experimentActions';
import { selectActivePlate } from '../../../store/selectors';
import styles from './Plate.module.css';

class Details extends Component {
  getOptions = memoize(barcodes => {
    return barcodes.map(barcode => {
      return { key: barcode, value: barcode, text: barcode };
    });
  });
  handleAddition = (e, { value }) => {
    this.props.onBarcodeAdd({ barcodes: [value] });
  };
  handleChange = (e, { value }) => {
    this.props.onBarcodeSelect({
      plateId: this.props.plate.id,
      barcode: value,
    });
  };
  render() {
    const { plate, barcodes } = this.props;
    let options = [];
    if(barcodes.length) {
      options = this.getOptions(barcodes);
    }
    else if(plate.barcode) {
      options = this.getOptions([plate.barcode]);
    }
    return (
      <div className={styles.details}>
        <div>
          <Icon name="barcode" />
          <Dropdown
            selection
            search
            allowAdditions
            upward
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
  onBarcodeAdd: PropTypes.func.isRequired,
  onBarcodeSelect: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const activePlate = selectActivePlate(state);
  const { barcodes } = state.designExperiment;
  return { plate: activePlate, barcodes };
};

const mapDispatch = {
  onBarcodeAdd: addBarcodes,
  onBarcodeSelect: setBarcode,
};

const connected = connect(
  mapState,
  mapDispatch
)(Details);
export { connected as Details };
