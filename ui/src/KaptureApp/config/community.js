import { getDefaultTimepoints, getDescription, exportComponent } from './utils';
import { EditForm } from './EditForm';
import { COMPONENT_TYPE_COMMUNITY } from './constants';

const TYPE = COMPONENT_TYPE_COMMUNITY;
const SINGULAR = 'Community';
const PLURAL = 'Communities';
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
    singularTypeDisplayName: SINGULAR,
    pluralTypeDisplayName: PLURAL,
    description: '',
    data,
    selected: true,
    editable: true,
    displayEditForm: false,
    tooltip: data.tooltip,
    color: COLOR,
    colorCode: COLOR_CODE,
    darkCode: DARK_CODE,
    darkerCode: DARKER_CODE,
    defaultBgClass: DEFAULT_BG_CLASS,
    darkBgClass: DARK_BG_CLASS,
    darkerBgClass: DARKER_BG_CLASS,
    abbreviation: ABBREVIATION,
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

export const community = {
  name: TYPE,
  singular: SINGULAR,
  plural: PLURAL,
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
  exportComponent,
  editForm: EditForm,
};
