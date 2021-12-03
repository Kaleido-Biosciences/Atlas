import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import './validators';
import { Timepoints } from './Timepoints';
import { getDescription } from '../../utils';

export class EditForm extends Component {
  handleChange = (timepoints) => {
    if (this.props.onChange) {
      const newComponent = { ...this.props.component };
      newComponent.form = {
        ...newComponent.form,
        timepoints,
      };
      const errors = validate.single(
        newComponent.form.timepoints,
        { timepoints: true },
        { fullMessages: false }
      );
      if (!errors) {
        newComponent.form.errors = [];
      } else {
        newComponent.form.errors = errors;
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
        timepoints={component.form.timepoints}
        timeUnits={component.form.units.time}
      />
    );
  }
}

EditForm.propTypes = {
  component: PropTypes.object,
  onChange: PropTypes.func,
};
