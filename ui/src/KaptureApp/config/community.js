import React from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import { getDefaultTimepoints, getDescription } from './utils';
import { Timepoints } from './Timepoints';

const TYPE = 'Community';
const DEFAULT_CONCENTRATION = 1.0;
const DEFAULT_TIME = 0;
const COLOR = 'green';
const COLOR_CODE = 'rgba(5, 150, 105, 1)';
const DARK_CODE = 'rgba(4, 120, 87, 1)';
const DARKER_CODE = 'rgba(6, 95, 70, 1)';
const DEFAULT_BG_CLASS = 'bg-green-600';
const DARK_BG_CLASS = 'bg-green-700';
const DARKER_BG_CLASS = 'bg-green-800';
const ABBREVIATION = 'C';

function createComponent(data, timepoints) {
  const component = {
    id: `${TYPE.toUpperCase()}_${data.id}`,
    type: TYPE,
    name: data.displayName,
    description: '',
    data,
    selected: true,
    editable: true,
    displayEditForm: false,
    fields: {
      timepoints:
        timepoints || getDefaultTimepoints(DEFAULT_CONCENTRATION, DEFAULT_TIME),
    },
    isValid: true,
    errors: [],
    tooltip: data.tooltip,
    color: COLOR,
    colorCode: COLOR_CODE,
    darkCode: DARK_CODE,
    darkerCode: DARKER_CODE,
    defaultBgClass: DEFAULT_BG_CLASS,
    darkBgClass: DARK_BG_CLASS,
    darkerBgClass: DARKER_BG_CLASS,
    abbreviation: ABBREVIATION,
  };
  component.description = getDescription(component);
  return component;
}

class editForm extends React.Component {
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
        allowMultiple={true}
        allowTimeChange={true}
        onChange={this.handleChange}
        timepoints={this.props.component.fields.timepoints}
      />
    );
  }
}

editForm.propTypes = {
  onChange: PropTypes.func,
};

export const community = {
  name: TYPE,
  singular: TYPE,
  plural: 'Communities',
  abbreviation: ABBREVIATION,
  typeColor: COLOR,
  colorCode: COLOR_CODE,
  darkCode: DARK_CODE,
  darkerCode: DARKER_CODE,
  defaultBgClass: DEFAULT_BG_CLASS,
  darkBgClass: DARK_BG_CLASS,
  darkerBgClass: DARKER_BG_CLASS,
  allowExcelImport: true,
  defaultConcentration: DEFAULT_CONCENTRATION,
  defaultTime: DEFAULT_TIME,
  allowAddTimepoint: true,
  enableOptions: ['concentration'],
  createComponent,
  exportComponent: (component) => {
    return {
      type: component.type,
      id: component.data.id,
      timepoints: component.fields.timepoints,
    };
  },
  editForm: editForm,
};
