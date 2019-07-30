import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import memoize from 'memoize-one';

export class PlateMapDropdown extends Component {
  mapDropdownOptions = memoize(plateMaps => {
    return plateMaps.map(plateMap => {
      return {
        key: plateMap.id,
        text: `Plate Map ${plateMap.id}`,
        value: plateMap.id,
      };
    });
  });

  handleChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const { activePlateMap, plateMaps } = this.props;
    const options = this.mapDropdownOptions(plateMaps);
    return (
      <Dropdown
        placeholder="Select Plate Map"
        fluid
        selection
        value={activePlateMap.id}
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

PlateMapDropdown.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};
