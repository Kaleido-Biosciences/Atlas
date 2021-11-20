import { COMPONENT_TYPE_ATTRIBUTE } from './constants';
import { AttributeEditForm } from './AttributeEditForm';

const TYPE = COMPONENT_TYPE_ATTRIBUTE;
const SINGULAR = 'Attribute';
const PLURAL = 'Attributes';
const COLOR_CODE = 'rgba(220, 38, 38, 1)';
const DARK_CODE = 'rgba(185, 28, 28, 1)';
const DARKER_CODE = 'rgba(153, 27, 27, 1)';
const DEFAULT_BG_CLASS = 'bg-red-600';
const DARK_BG_CLASS = 'bg-red-700';
const DARKER_BG_CLASS = 'bg-red-800';
const ABBREVIATION = 'A';

function createComponent(data) {
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
    displayEditForm: true,
    tooltip: data.tooltip,
    colorCode: COLOR_CODE,
    darkCode: DARK_CODE,
    darkerCode: DARKER_CODE,
    defaultBgClass: DEFAULT_BG_CLASS,
    darkBgClass: DARK_BG_CLASS,
    darkerBgClass: DARKER_BG_CLASS,
    abbreviation: ABBREVIATION,
    form: {
      errors: ['A value is required.'],
      value: '',
      valueType: data.valueType,
      valueUnit: null,
      units: data.units,
    },
  };
  return component;
}

export const attribute = {
  name: TYPE,
  singular: SINGULAR,
  plural: PLURAL,
  abbreviation: ABBREVIATION,
  colorCode: COLOR_CODE,
  darkCode: DARK_CODE,
  darkerCode: DARKER_CODE,
  defaultBgClass: DEFAULT_BG_CLASS,
  darkBgClass: DARK_BG_CLASS,
  darkerBgClass: DARKER_BG_CLASS,
  allowExcelImport: false,
  defaultConcentration: null,
  defaultTime: null,
  createComponent,
  exportComponent: (component) => {
    return {
      value: component.form.value,
      valueUnit: component.form.valueUnit,
    };
  },
  editForm: AttributeEditForm,
};
