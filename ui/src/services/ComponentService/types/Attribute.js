import { COMPONENT_TYPE_ATTRIBUTE } from '../constants';
import { AttributeEditForm } from '../forms/AttributeEditForm';
import { getDescription } from '../utils';

const TYPE = COMPONENT_TYPE_ATTRIBUTE;
const COLOR_CODE = 'rgba(220, 38, 38, 1)';
const DARK_CODE = 'rgba(185, 28, 28, 1)';
const DARKER_CODE = 'rgba(153, 27, 27, 1)';
const DEFAULT_BG_CLASS = 'bg-red-600';
const DARK_BG_CLASS = 'bg-red-700';
const DARKER_BG_CLASS = 'bg-red-800';

function createComponent(componentData, wellComponentData) {
  const component = {
    id: `${TYPE.toUpperCase()}_${componentData.id}`,
    type: TYPE,
    name: componentData.displayName,
    description: '',
    data: componentData,
    selected: true,
    editable: true,
    displayEditForm: true,
    tooltip: componentData.tooltip,
    colorCode: COLOR_CODE,
    darkCode: DARK_CODE,
    darkerCode: DARKER_CODE,
    defaultBgClass: DEFAULT_BG_CLASS,
    darkBgClass: DARK_BG_CLASS,
    darkerBgClass: DARKER_BG_CLASS,
    form: {
      errors: ['A value is required.'],
      value: '',
      valueType: componentData.valueType,
      valueUnit: null,
      units: componentData.units,
    },
  };
  if (wellComponentData && wellComponentData.fields) {
    component.form.value = wellComponentData.fields.value;
    if (component.form.value === 'true') component.form.value = true;
    else if (component.form.value === 'false') component.form.value = false;
    component.form.valueUnit = wellComponentData.fields.valueUnit;
  }
  component.description = getDescription(component);
  return component;
}

export const Attribute = {
  name: TYPE,
  singularDisplayName: 'Attribute',
  pluralDisplayName: 'Attributes',
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
      id: component.data.id,
      type: component.type,
      fields: {
        value: component.form.value,
        valueUnitId: component.form.valueUnit
          ? component.form.valueUnit.id
          : null,
      },
    };
  },
  editForm: AttributeEditForm,
};
