import { COMPONENT_TYPE_MEDIUM } from '../constants';
import { EditForm } from '../forms/EditForm';
import {
  getDefaultTimepoints,
  getDescription,
  exportComponent,
} from '../utils';

const TYPE = COMPONENT_TYPE_MEDIUM;
const DEFAULT_CONCENTRATION = '';
const DEFAULT_TIME = 0;
const COLOR_CODE = 'rgba(245, 158, 11, 1)';
const DARK_CODE = 'rgba(217, 119, 6, 1';
const DARKER_CODE = 'rgba(180, 83, 9, 1)';
const DEFAULT_BG_CLASS = 'bg-yellow-500';
const DARK_BG_CLASS = 'bg-yellow-600';
const DARKER_BG_CLASS = 'bg-yellow-700';

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
    tooltip: data.tooltip,
    colorCode: COLOR_CODE,
    darkCode: DARK_CODE,
    darkerCode: DARKER_CODE,
    defaultBgClass: DEFAULT_BG_CLASS,
    darkBgClass: DARK_BG_CLASS,
    darkerBgClass: DARKER_BG_CLASS,
    form: {
      errors: [],
      units: data.units,
      timepoints:
        timepoints || getDefaultTimepoints(DEFAULT_CONCENTRATION, DEFAULT_TIME),
    },
  };
  component.description = getDescription(component);
  return component;
}

export const Medium = {
  name: TYPE,
  singularDisplayName: 'Medium',
  pluralDisplayName: 'Media',
  colorCode: COLOR_CODE,
  darkCode: DARK_CODE,
  darkerCode: DARKER_CODE,
  defaultBgClass: DEFAULT_BG_CLASS,
  darkBgClass: DARK_BG_CLASS,
  darkerBgClass: DARKER_BG_CLASS,
  allowExcelImport: true,
  defaultConcentration: DEFAULT_CONCENTRATION,
  defaultTime: DEFAULT_TIME,
  createComponent,
  exportComponent,
  editForm: EditForm,
};
