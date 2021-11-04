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
    return (
      <Timepoints
        concentrationUnits={this.props.concentrationUnits}
        onChange={this.handleChange}
        timepoints={this.props.component.fields.timepoints}
        timeUnits={this.props.timeUnits}
      />
    );
  }
}

EditForm.propTypes = {
  component: PropTypes.object,
  concentrationUnits: PropTypes.array,
  onChange: PropTypes.func,
  timeUnits: PropTypes.array,
};
