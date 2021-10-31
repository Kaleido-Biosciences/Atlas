import { getDefaultTimepoints, getDescription } from './utils';
import { EditForm } from './EditForm';

const TYPE = 'Medium';
const DEFAULT_CONCENTRATION = null;
const DEFAULT_TIME = 0;
const COLOR = 'orange';
const COLOR_CODE = 'rgba(245, 158, 11, 1)';
const DARK_CODE = 'rgba(217, 119, 6, 1';
const DARKER_CODE = 'rgba(180, 83, 9, 1)';
const DEFAULT_BG_CLASS = 'bg-yellow-500';
const DARK_BG_CLASS = 'bg-yellow-600';
const DARKER_BG_CLASS = 'bg-yellow-700';
const ABBREVIATION = 'M';

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

export const medium = {
  name: TYPE,
  singular: TYPE,
  plural: 'Media',
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
  enableOptions: [],
  createComponent,
  exportComponent: (component) => {
    return {
      type: component.type,
      id: component.data.id,
      timepoints: component.fields.timepoints,
    };
  },
  editForm: EditForm,
};
