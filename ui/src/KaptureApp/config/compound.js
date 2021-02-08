import { getName, getDefaultTimepoints } from './utils';

const TYPE = 'Compound';
const DEFAULT_CONCENTRATION = 0.5;
const DEFAULT_TIME = 0;
const COLOR = 'blue';
const COLOR_CODE = '#2185d0';
const ABBREVIATION = 'B';

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
  if (data.aveDP) {
    tooltip.push({
      key: 'Avg. DP',
      value: data.aveDP.toFixed(2),
    });
  }
  if (data.glycanComposition) {
    tooltip.push({
      key: 'Glycan Composition',
      value: data.glycanComposition,
    });
  }
  if (data.dataRecordName) {
    tooltip.push({ key: 'Data record name', value: data.dataRecordName });
  }
  if (data.createdBy) {
    tooltip.push({ key: 'Created by', value: data.createdBy });
  }
  if (data.dateCreated) {
    tooltip.push({
      key: 'Created date',
      value: formatDate(data.dateCreated),
    });
  }
  if (data.notes) {
    tooltip.push({ key: 'Notes', value: data.notes });
  }
  return tooltip;
}

function formatDate(iso_text) {
  let d = new Date(iso_text),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export const compound = {
  name: TYPE,
  singular: TYPE,
  plural: 'Compounds',
  abbreviation: ABBREVIATION,
  typeColor: COLOR,
  colorCode: COLOR_CODE,
  allowExcelImport: true,
  defaultConcentration: DEFAULT_CONCENTRATION,
  defaultTime: DEFAULT_TIME,
  allowAddTimepoint: false,
  enableOptions: ['concentration'],
  createToolComponent,
};
