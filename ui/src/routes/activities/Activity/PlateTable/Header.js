import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlateDropdown } from '../PlateDropdown';

export class Header extends Component {
  handleSaveName = (value) => {
    if (this.props.onSaveName) {
      this.props.onSaveName(this.props.plate.id, value);
    }
  };
  render() {
    return (
      <div className="px-3 py-2 bg-gray-50 flex flex-row items-center border-b border-gray-100 text-sm">
        <div className="w-52">
          <PlateDropdown
            onChange={this.props.onPlateChange}
            plates={this.props.plates}
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onPlateChange: PropTypes.func,
  onSaveName: PropTypes.func,
  plates: PropTypes.array,
};
