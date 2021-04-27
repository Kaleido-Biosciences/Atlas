import { getName, getDefaultTimepoints, getDescription } from './utils';

const TYPE = 'Medium';
const DEFAULT_CONCENTRATION = null;
const DEFAULT_TIME = 0;
const COLOR = 'orange';
const COLOR_CODE = '#f2711c';
const ABBREVIATION = 'M';

function createComponent(data, timepoints) {
  const component = {
    id: `${TYPE.toUpperCase()}_${data.id}`,
    type: TYPE,
    name: getName(data),
    description: '',
    data,
    selected: true,
    editable: false,
    displayEditForm: false,
    fields: {
      timepoints:
        timepoints || getDefaultTimepoints(DEFAULT_CONCENTRATION, DEFAULT_TIME),
    },
    isValid: true,
    errors: [],
    tooltip: [],
    color: COLOR,
    colorCode: COLOR_CODE,
    abbreviation: ABBREVIATION,
  };
  component.description = getDescription(component);
  return component;
}

export const medium = {
  name: TYPE,
  singular: TYPE,
  plural: 'Media',
  abbreviation: ABBREVIATION,
  typeColor: COLOR,
  colorCode: COLOR_CODE,
  allowExcelImport: true,
  defaultConcentration: DEFAULT_CONCENTRATION,
  defaultTime: DEFAULT_TIME,
  allowAddTimepoint: false,
  enableOptions: [],
  createComponent,
  exportComponent: (component) => {
    return {
      type: component.type,
      id: component.data.id,
      timepoints: component.fields.timepoints,
    };
  },
};
