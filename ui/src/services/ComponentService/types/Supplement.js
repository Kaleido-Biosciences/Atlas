import { COMPONENT_TYPE_SUPPLEMENT } from '../constants';
import { EditForm } from '../forms/EditForm';
import {
  getDefaultTimepoints,
  getDescription,
  exportComponent,
} from '../utils';

const TYPE = COMPONENT_TYPE_SUPPLEMENT;
const DEFAULT_CONCENTRATION = 0.5;
const DEFAULT_TIME = 0;
const COLOR_CODE = 'rgba(55, 65, 81, 1)';
const DARK_CODE = 'rgba(31, 41, 55, 1)';
const DARKER_CODE = 'rgba(17, 24, 39, 1)';
const DEFAULT_BG_CLASS = 'bg-gray-700';
const DARK_BG_CLASS = 'bg-gray-800';
const DARKER_BG_CLASS = 'bg-gray-900';

function createComponent(componentData, wellComponentData) {
  const component = {
    id: `${TYPE.toUpperCase()}_${componentData.id}`,
    type: TYPE,
    name: componentData.displayName,
    description: '',
    data: componentData,
    selected: true,
    editable: true,
    displayEditForm: false,
    tooltip: componentData.tooltip,
    colorCode: COLOR_CODE,
    darkCode: DARK_CODE,
    darkerCode: DARKER_CODE,
    defaultBgClass: DEFAULT_BG_CLASS,
    darkBgClass: DARK_BG_CLASS,
    darkerBgClass: DARKER_BG_CLASS,
    form: {
      errors: [],
      units: componentData.units,
      timepoints: undefined,
    },
  };
  component.form.timepoints =
    wellComponentData && wellComponentData.fields
      ? wellComponentData.fields.timepoints
      : getDefaultTimepoints(DEFAULT_CONCENTRATION, DEFAULT_TIME);
  component.description = getDescription(component);
  return component;
}

export const Supplement = {
  name: TYPE,
  singularDisplayName: 'Supplement',
  pluralDisplayName: 'Supplements',
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
