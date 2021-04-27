import { getDescription } from './utils';

const TYPE = 'Attribute';
const COLOR = 'red';
const COLOR_CODE = '#db2828';
const ABBREVIATION = 'A';

function createComponent(data) {
  const { key, value, valueType, valueUnit } = data;
  const id = value ? `${key}_${value}`.replace(/ /g, '_') : key;
  const unit = value && valueUnit ? valueUnit : '';
  const name = value ? `${key}: ${value}${unit}` : key;
  const component = {
    id: `${TYPE.toUpperCase()}_${id}`,
    type: TYPE,
    name,
    description: '',
    data: {
      id,
      name,
      key,
      value,
      value_type: valueType,
      value_unit: valueUnit,
    },
    selected: true,
    editable: false,
    displayEditForm: false,
    fields: {
      key,
      value,
      value_type: valueType,
      value_unit: valueUnit,
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

export const attribute = {
  name: TYPE,
  singular: TYPE,
  plural: 'Attributes',
  abbreviation: ABBREVIATION,
  typeColor: COLOR,
  colorCode: COLOR_CODE,
  allowExcelImport: false,
  defaultConcentration: null,
  defaultTime: null,
  allowAddTimepoint: false,
  enableOptions: ['concentration'],
  createComponent,
};
