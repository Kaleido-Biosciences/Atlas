import React from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import { getDefaultTimepoints, getDescription } from './utils';
import { Timepoints } from './Timepoints';

const TYPE = 'Compound';
const DEFAULT_CONCENTRATION = 0.5;
const DEFAULT_TIME = 0;
const COLOR = 'blue';
const COLOR_CODE = 'rgba(37, 99, 235, 1)';
const DARK_CODE = 'rgba(29, 78, 216, 1';
const DARKER_CODE = 'rgba(30, 64, 175, 1)';
const DEFAULT_BG_CLASS = 'bg-blue-600';
const DARK_BG_CLASS = 'bg-blue-700';
const DARKER_BG_CLASS = 'bg-blue-800';
const ABBREVIATION = 'B';

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
        allowMultiple={false}
        allowTimeChange={false}
        onChange={this.handleChange}
        timepoints={this.props.component.fields.timepoints}
      />
    );
  }
}

editForm.propTypes = {
  onChange: PropTypes.func,
};

export const compound = {
  name: TYPE,
  singular: TYPE,
  plural: 'Compounds',
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
  allowAddTimepoint: false,
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
