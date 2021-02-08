import { getName, getDefaultTimepoints } from './utils';

const TYPE = 'Community';
const DEFAULT_CONCENTRATION = 1.0;
const DEFAULT_TIME = 0;
const COLOR = 'green';
const COLOR_CODE = '#21ba45';
const ABBREVIATION = 'C';

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
    tooltip: [],
    color: COLOR,
    colorCode: COLOR_CODE,
    abbreviation: ABBREVIATION,
  };
}

export const community = {
  name: TYPE,
  singular: TYPE,
  plural: 'Communities',
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
