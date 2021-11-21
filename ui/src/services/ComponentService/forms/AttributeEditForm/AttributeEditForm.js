import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { getDescription } from '../../utils';
import { BooleanSelect } from './BooleanSelect';
import { UnitDropdown } from '../UnitDropdown';

export class AttributeEditForm extends Component {
  handleChange = (value, valueUnit) => {
    if (this.props.onChange) {
      const { component } = this.props;
      const valueType = component.form.valueType;
      const newComponent = {
        ...component,
        form: {
          ...component.form,
          errors: [],
          value,
          valueUnit,
        },
      };
      if (newComponent.form.value === '') {
        newComponent.form.errors.push('A value is required.');
      } else {
        if (valueType === 'Integer') {
          if (!validate.isInteger(newComponent.form.value)) {
            newComponent.form.errors.push('Value must be an integer.');
          }
        } else if (valueType === 'Double') {
          if (!validate.isNumber(newComponent.form.value)) {
            newComponent.form.errors.push('Value must be a number.');
          }
        } else if (valueType === 'Boolean') {
          if (!validate.isBoolean(newComponent.form.value)) {
            newComponent.form.errors.push('Value must be a boolean.');
          }
        }
      }
      newComponent.description = getDescription(newComponent);
      this.props.onChange(newComponent);
    }
  };
  handleUnitChange = (unit) => {
    this.handleChange(this.props.component.form.value, unit);
  };
  handleDoubleChange = (e) => {
    this.handleChange(
      e.target.value ? parseFloat(e.target.value) : '',
      this.props.component.form.valueUnit
    );
  };
  handleIntegerChange = (e) => {
    this.handleChange(
      e.target.value ? parseInt(e.target.value) : '',
      this.props.component.form.valueUnit
    );
  };
  handleTextChange = (e) => {
    this.handleChange(e.target.value, this.props.component.form.valueUnit);
  };
  handleBooleanChange = (value) => {
    this.handleChange(value, this.props.component.form.valueUnit);
  };
  render() {
    const { component } = this.props;
    const { value, valueType, valueUnit, units } = component.form;
    const inputClassName =
      'px-2 py-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs border-gray-300 rounded-md';
    let content;
    if (valueType === 'Double') {
      content = (
        <div className="w-32">
          <input
            type="number"
            className={inputClassName}
            onChange={this.handleDoubleChange}
            value={value}
          />
          <UnitDropdown
            options={units.value}
            onChange={this.handleUnitChange}
            value={valueUnit}
          />
        </div>
      );
    } else if (valueType === 'Integer') {
      content = (
        <div className="w-32">
          <input
            type="number"
            className={inputClassName}
            onChange={this.handleIntegerChange}
            value={value}
          />
          <UnitDropdown
            options={units.value}
            onChange={this.handleUnitChange}
            value={valueUnit}
          />
        </div>
      );
    } else if (valueType === 'Text') {
      content = (
        <div className="w-32">
          <input
            type="text"
            className={inputClassName}
            onChange={this.handleTextChange}
            value={value}
          />
          <UnitDropdown
            options={units.value}
            onChange={this.handleUnitChange}
            value={valueUnit}
          />
        </div>
      );
    } else if (valueType === 'Boolean') {
      content = (
        <BooleanSelect onChange={this.handleBooleanChange} value={value} />
      );
    }
    return <div>{content}</div>;
  }
}

AttributeEditForm.propTypes = {
  component: PropTypes.object,
  onChange: PropTypes.func,
};
