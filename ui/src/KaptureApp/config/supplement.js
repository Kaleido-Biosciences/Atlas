import { getName, getDefaultTimepoints } from './utils';

const TYPE = 'Supplement';
const DEFAULT_CONCENTRATION = 0.5;
const DEFAULT_TIME = 0;
const COLOR = 'black';
const COLOR_CODE = '#1b1c1d';
const ABBREVIATION = 'S';

function createToolComponent(data, timepoints) {
  return {
    id: `${TYPE.toUpperCase()}_${data.id}`,
    name: getName(data),
    type: TYPE,
    data,
    selected: true,
    isValid: true,
    timepoints:
      timepoints || getDefaultTimepoints(DEFAULT_CONCENTRATION, DEFAULT_TIME),
    tooltip: getTooltip(data),
    color: COLOR,
    colorCode: COLOR_CODE,
    abbreviation: ABBREVIATION,
  };
}

function getTooltip(data) {
  const tooltip = [];
  if (data.source) {
    tooltip.push({ key: 'Source', value: data.source });
  }
  if (data.registrationDate) {
    tooltip.push({ key: 'Registration Date', value: data.registrationDate });
  }
  return tooltip;
}

export const supplement = {
  name: TYPE,
  singular: TYPE,
  plural: 'Supplements',
  abbreviation: ABBREVIATION,
  typeColor: COLOR,
  colorCode: COLOR_CODE,
  allowExcelImport: true,
  defaultConcentration: DEFAULT_CONCENTRATION,
  defaultTime: DEFAULT_TIME,
  allowAddTimepoint: true,
  enableOptions: ['concentration'],
  createToolComponent,
};
