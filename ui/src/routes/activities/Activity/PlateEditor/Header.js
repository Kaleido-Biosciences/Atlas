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
        <div className="flex items-center">
          <div className="text-xs mr-4">
            <input
              checked={this.props.viewData.enableTooltips}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
              name="enableTooltips"
              onChange={this.props.onToggleTooltips}
              type="checkbox"
            />
            Enable Tooltips
          </div>
          <SizeOptions
            onChange={this.props.onSizeChange}
            options={this.props.viewData.sizeOptions}
            value={this.props.viewData.selectedSizeOption}
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onPlateChange: PropTypes.func,
  onSaveName: PropTypes.func,
  onSizeChange: PropTypes.func,
  onToggleTooltips: PropTypes.func,
  plates: PropTypes.array,
  viewData: PropTypes.object,
};
