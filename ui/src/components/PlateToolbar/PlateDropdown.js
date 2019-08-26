import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import memoize from 'memoize-one';

export class PlateDropdown extends Component {
  mapDropdownOptions = memoize(plates => {
    return plates.map(plate => {
      return {
        key: plate.id,
        text: `Plate ${plate.id}`,
        value: plate.id,
      };
    });
  });

  handleChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const { activePlate, plates } = this.props;
    const options = this.mapDropdownOptions(plates);
    return (
      <Dropdown
        placeholder="Select Plate"
        fluid
        selection
        value={activePlate.id}
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

PlateDropdown.propTypes = {
  plates: PropTypes.array.isRequired,
  activePlate: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};
