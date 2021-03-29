const TYPE = 'Attribute';
const COLOR = 'red';
const COLOR_CODE = '#db2828';
const ABBREVIATION = 'A';

function createToolComponent(data) {
  const { key, value, valueType, valueUnit } = data;
  const id = value ? `${key}_${value}`.replace(/ /g, '_') : key;
  const unit = value && valueUnit ? valueUnit : '';
  const name = value ? `${key}: ${value}${unit}` : key;
  return {
    id: `${TYPE.toUpperCase()}_${id}`,
    name,
    type: TYPE,
    data: {
      id,
      name,
      key,
      value,
      value_type: valueType,
      value_unit: valueUnit,
    },
    selected: true,
    isValid: true,
    timepoints: [],
    tooltip: [],
    color: COLOR,
    colorCode: COLOR_CODE,
    abbreviation: ABBREVIATION,
  };
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
  createToolComponent,
};
