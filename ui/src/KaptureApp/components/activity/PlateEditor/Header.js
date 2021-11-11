import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlateDropdown } from '../PlateDropdown';
import { SizeOptions } from './SizeOptions';

export class Header extends Component {
  handleSaveName = (value) => {
    if (this.props.onSaveName) {
      this.props.onSaveName(this.props.plate.id, value);
    }
  };
  render() {
    return (
      <div className="px-3 py-2 bg-gray-50 flex flex-row items-center border-b border-gray-100 text-sm justify-between">
        <div className="w-52">
          <PlateDropdown
            onChange={this.props.onPlateChange}
            plates={this.props.plates}
          />
        </div>
        <SizeOptions
          onChange={this.props.onSizeChange}
          options={this.props.sizeOptions}
          value={this.props.selectedSizeOption}
        />
      </div>
    );
  }
}

Header.propTypes = {
  onPlateChange: PropTypes.func,
  onSaveName: PropTypes.func,
  onSizeChange: PropTypes.func,
  plates: PropTypes.array,
  selectedSizeOption: PropTypes.string,
  sizeOptions: PropTypes.array,
};
