import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnitDropdown } from './UnitDropdown';

export class Timepoint extends Component {
  handleConcChange = (e) => {
    if (this.props.onChange) {
      const values = { ...this.props.timepoint };
      values.concentration = e.target.value ? parseFloat(e.target.value) : '';
      this.props.onChange(this.props.index, values);
    }
  };
  handleConcUnitChange = (option) => {
    if (this.props.onChange) {
      const values = { ...this.props.timepoint };
      values.concentrationUnitId = option.id;
      values.concentrationUnitAbbreviation = option.abbreviation;
      this.props.onChange(this.props.index, values);
    }
  };
  handleTimeChange = (e) => {
    if (this.props.onChange) {
      const values = { ...this.props.timepoint };
      values.time = e.target.value ? parseFloat(e.target.value) : '';
      this.props.onChange(this.props.index, values);
    }
  };
  handleTimeUnitChange = (option) => {
    if (this.props.onChange) {
      const values = { ...this.props.timepoint };
      values.timeUnitId = option.id;
      values.timeUnitAbbreviation = option.abbreviation;
      this.props.onChange(this.props.index, values);
    }
  };
  handleDeleteClick = () => {
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(this.props.index);
    }
  };
  render() {
    const { timepoint } = this.props;
    return (
      <div className="flex mb-1 items-center">
        <div className="mr-4">
          <label className="text-white text-xxs">Concentration</label>
          <div className="w-24">
            <input
              className="px-2 py-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs border-gray-300 rounded-md"
              name="concentration"
              onChange={this.handleConcChange}
              type="number"
              value={timepoint.concentration}
            />
          </div>
          <UnitDropdown
            onChange={this.handleConcUnitChange}
            options={this.props.concentrationUnits}
            value={timepoint.concentrationUnitId}
          />
        </div>
        <div>
          <label className="text-white text-xxs">Time</label>
          <div className="w-24">
            <input
              className="px-2 py-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs border-gray-300 rounded-md"
              name="time"
              onChange={this.handleTimeChange}
              type="number"
              value={timepoint.time}
            />
            <UnitDropdown
              options={this.props.timeUnits}
              onChange={this.handleTimeUnitChange}
              value={timepoint.timeUnitId}
            />
          </div>
        </div>
        {this.props.allowDelete && (
          <FontAwesomeIcon
            className="text-white text-sm cursor-pointer opacity-60 hover:opacity-100 ml-4 mt-4"
            icon="minus-circle"
            onClick={this.handleDeleteClick}
            title="Remove timepoint"
          />
        )}
      </div>
    );
  }
}

Timepoint.propTypes = {
  allowDelete: PropTypes.bool.isRequired,
  concentrationUnits: PropTypes.array,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  onDeleteClick: PropTypes.func,
  timepoint: PropTypes.object,
  timeUnits: PropTypes.array,
};
