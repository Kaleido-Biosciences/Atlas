import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { Timepoints } from './Timepoints';
import { getDescription } from '../utils';

export class EditForm extends Component {
  handleChange = (timepoints) => {
    if (this.props.onChange) {
      const newComponent = { ...this.props.component };
      newComponent.fields = {
        ...newComponent.fields,
        timepoints,
      };
      const errors = validate.single(
        newComponent.fields.timepoints,
        { timepoints: true },
        { fullMessages: false }
      );
      if (!errors) {
        newComponent.isValid = true;
        newComponent.errors = [];
      } else {
        newComponent.isValid = false;
        newComponent.errors = errors;
      }
      newComponent.description = getDescription(newComponent);
      this.props.onChange(newComponent);
    }
  };
  render() {
    const { component } = this.props;
    return (
      <Timepoints
        concentrationUnits={component.form.units.concentration}
        onChange={this.handleChange}
        timepoints={component.fields.timepoints}
        timeUnits={component.form.units.time}
      />
    );
  }
}

EditForm.propTypes = {
  component: PropTypes.object,
  onChange: PropTypes.func,
};
