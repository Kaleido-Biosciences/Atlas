import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ui';

export class PlateOption extends Component {
  handlePlateSelect = (e) => {
    if (!e.target.value) {
      this.props.onChange(this.props.targetPlate, null);
    } else {
      const value = parseInt(e.target.value);
      const sourcePlate = this.props.sourcePlates.find(
        (plate) => plate.id === value
      );
      this.props.onChange(this.props.targetPlate, sourcePlate);
    }
  };
  handleUseForAll = () => {
    this.props.onUseForAll(this.props.value ? this.props.value : null);
  };
  render = () => {
    const { targetPlate, sourcePlates } = this.props;
    let value = this.props.value ? this.props.value : '';
    return (
      <tr>
        <td className="py-1">
          <span className="text-xs">{targetPlate.name}</span>
        </td>
        <td className="py-1">
          <select
            className="block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm text-xs border-gray-300 rounded-md"
            onChange={this.handlePlateSelect}
            value={value}
          >
            <option></option>
            {sourcePlates.map((plate) => {
              return (
                <option className="text-sm" value={plate.id} key={plate.id}>
                  {plate.name}
                </option>
              );
            })}
          </select>
        </td>
        <td className="py-1">
          {this.props.value ? (
            <Button secondary onClick={this.handleUseForAll} className="ml-2">
              Use for all
            </Button>
          ) : null}
        </td>
      </tr>
    );
  };
}

PlateOption.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUseForAll: PropTypes.func.isRequired,
  sourcePlates: PropTypes.array.isRequired,
  targetPlate: PropTypes.object.isRequired,
  value: PropTypes.number,
};
