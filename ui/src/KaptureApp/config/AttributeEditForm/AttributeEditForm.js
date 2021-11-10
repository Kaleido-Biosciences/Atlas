import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { getDescription } from '../utils';
import { BooleanSelect } from './BooleanSelect';
import { UnitDropdown } from '../EditForm/UnitDropdown';

export class AttributeEditForm extends Component {
  handleChange = (value, valueUnitId) => {
    if (this.props.onChange) {
      let valid = true;
      const { component } = this.props;
      const valueType = component.form.value.valueType;
      const newComponent = {
        ...component,
        form: {
          ...component.form,
          value: {
            ...component.form.value,
            value,
            valueUnitId,
          },
        },
        errors: [],
      };
      if (newComponent.form.value.value === '') {
        newComponent.errors.push('A value is required.');
        valid = false;
      } else {
        if (valueType === 'Integer') {
          if (!validate.isInteger(newComponent.form.value.value)) {
            newComponent.errors.push('Value must be an integer.');
            valid = false;
          }
        } else if (valueType === 'Double') {
          if (!validate.isNumber(newComponent.form.value.value)) {
            newComponent.errors.push('Value must be a number.');
            valid = false;
          }
        } else if (valueType === 'Boolean') {
          if (!validate.isBoolean(newComponent.form.value.value)) {
            newComponent.errors.push('Value must be a boolean.');
            valid = false;
          }
        }
      }
      newComponent.isValid = valid;
      newComponent.description = getDescription(newComponent);
      this.props.onChange(newComponent);
    }
  };
  handleUnitChange = (unit) => {
    this.handleChange(this.props.component.form.value.value, unit.id);
  };
  handleDoubleChange = (e) => {
    this.handleChange(
      e.target.value ? parseFloat(e.target.value) : '',
      this.props.component.form.value.valueUnitId
    );
  };
  handleIntegerChange = (e) => {
    this.handleChange(
      e.target.value ? parseInt(e.target.value) : '',
      this.props.component.form.value.valueUnitId
    );
  };
  handleTextChange = (e) => {
    this.handleChange(
      e.target.value,
      this.props.component.form.value.valueUnitId
    );
  };
  handleBooleanChange = (value) => {
    this.handleChange(value, this.props.component.form.value.valueUnitId);
  };
  render() {
    const { component } = this.props;
    const { value, valueType, valueUnitId, units } = component.form.value;
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
            value={valueUnitId}
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
            value={valueUnitId}
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
            value={valueUnitId}
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
